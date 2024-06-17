import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

const CapacityOverview: React.FC = () => {
  const { data: nodesData, error: nodesError } = useSWR('https://zynapse.zkagi.ai/api/nodes', { refreshInterval: 8000,});
  const { data: gpuData, error: gpuError } = useSWR('https://zynapse.zkagi.ai/api/dailystats', { refreshInterval: 8000,});
  
  const [gpuCapacity, setGPUCapacity] = useState<any>(0);
  const [cpuCapacity, setCPUCapacity] = useState<any>(0);
  const [aliveCount, setAliveCount] = useState(0);

  useEffect(() => {
    if (nodesData?.data?.summary) {
      let totalCPU = 0;
      const aliveNodes = nodesData?.data?.summary.filter((node: any) => node.raylet.state === 'ALIVE').length;
      setAliveCount(aliveNodes);

      nodesData.data.summary.forEach((node: any) => {
        if (node?.raylet.state === 'ALIVE' && node?.raylet?.resourcesTotal) {
          totalCPU += node.raylet.resourcesTotal.CPU || 0;
        }
      });

      setCPUCapacity(totalCPU);
    }
  }, [nodesData]);

  useEffect(() => {
    if (gpuData) {
      const latestData = gpuData[gpuData.length - 1];
      if (latestData?.data?.totalGpusMemoryGB) {
        setGPUCapacity(latestData.data.totalGpusMemoryGB);
      }
    }
  }, [gpuData]);

  return (
    <div>
      <div>Total Capacity</div>
      <div className="grid grid-cols-2 justify-center items-center p-4 rounded-lg bg-gradient-to-br from-[#14163e] via-[#1c1d4e] to-[#1c1e51] mb-4 mt-2">
        <div>GPU</div>
        <div className="flex flex-row gap-2">
          <p className="text-3xl text-[#0075FF] mt-1">{gpuCapacity}</p>
          <p className="mt-5 text-xs">Gb</p>
        </div>
      </div>
      <div className="grid grid-cols-2 justify-center items-center p-4 rounded-lg bg-gradient-to-br from-[#14163e] via-[#1c1d4e] to-[#1c1e51] mb-4 mt-2">
        <div>CPU</div>
        <div className="flex flex-row gap-2">
          <p className="text-3xl text-[#0075FF] mt-1">{cpuCapacity}</p>
          <p className="mt-5 text-xs">Core</p>
        </div>
      </div>
      <div className="grid grid-cols-2 justify-center items-center p-4 rounded-lg bg-gradient-to-br from-[#14163e] via-[#1c1d4e] to-[#1c1e51]">
        <div>NODES</div>
        <div className="flex flex-row">
          <p className="text-3xl text-[#0075FF]">{aliveCount}</p>
          <p></p>
        </div>
      </div>
    </div>
  );
}

export default CapacityOverview;

