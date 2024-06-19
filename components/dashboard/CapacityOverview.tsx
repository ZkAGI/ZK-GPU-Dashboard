import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const CapacityOverview: React.FC = () => {
  const { data: nodesData, error: nodesError } = useSWR(`${BASE_URL}/api/nodes`, { refreshInterval: 8000,});
  const { data: gpuData, error: gpuError } = useSWR(`${BASE_URL}/api/dailystats`, { refreshInterval: 8000,});
  
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
      const totalGpuMemory = nodesData?.data?.summary.reduce((totalMemory: number, node: any) => {
        if (node.raylet.state !== 'DEAD') {
          return totalMemory + (Array.isArray(node.gpus) ? node.gpus.reduce((gpuTotal: number, gpu: any) => gpuTotal + (gpu?.memoryTotal ? Number(gpu.memoryTotal) / 1024 : 0), 0) : 0);
        }
        return totalMemory;
      }, 0);

      setGPUCapacity(totalGpuMemory);
      
    }
  }, [nodesData]);


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

