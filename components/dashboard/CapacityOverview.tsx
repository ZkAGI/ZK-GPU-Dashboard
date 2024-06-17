import { memoryConverter } from '@/utils/memoryConverter';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

const CapacityOverview: React.FC = () => {
  const {data,error} =useSWR('https://zynapse.zkagi.ai/api/nodes')
  const [gpuCapacity, setGPUCapacity] = useState<any>(0);
  const [cpuCapacity, setCPUCapacity] = useState<any>(0);
  const [aliveCount, setAliveCount] = useState(0);

  useEffect(() => {
    if (data?.data?.summary) {
      let totalCPU = 0;
      let totalGPU = 0;
      const aliveNodes = data?.data?.summary.filter((node: any) => node.raylet.state === 'ALIVE').length;
      setAliveCount(aliveNodes)

      data.data.summary.forEach((node: any) => {
        console.log(node)
        if (node?.raylet.state==='ALIVE' && node?.raylet?.resourcesTotal) {
          totalCPU += node.raylet.resourcesTotal.CPU || 0;
          totalGPU += node.raylet.resourcesTotal.GPU || 0;
        }
      });

      setCPUCapacity(totalCPU);
      setGPUCapacity(totalGPU);
    }
  }, [data]);
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
