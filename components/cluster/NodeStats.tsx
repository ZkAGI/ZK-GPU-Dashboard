import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

const NodeStats: React.FC = () => {
const { data, error } = useSWR('https://zynapse.zkagi.ai/api/nodes', { refreshInterval: 1000 });

const [idleCount, setIdleCount] = useState(0);
const [aliveCount, setAliveCount] = useState(0);

useEffect(() => {
  if (data) {
    const clusterData = data?.data?.summary;
    if (clusterData) {
      const idleNodes = clusterData.filter((node: any) => node.raylet.state === 'DEAD').length;
      const aliveNodes = clusterData.filter((node: any) => node.raylet.state === 'ALIVE').length;
      setIdleCount(idleNodes);
      setAliveCount(aliveNodes);
    }
  }
}, [data]);
  
  return (
    <div className=" flex flex-col gap-2 lg:grid lg:grid-cols-3 lg:justify-between lg:gap-6 lg:gap-2 lg:w-5/12 mb-5">
      <div className="border flex flex-row justify-around items-center p-2 rounded-lg">
        <div className="text-sm">TOTAL</div>
        <div className="text-3xl">{aliveCount+idleCount}</div>
      </div>
      <div className="border border-[#01B574] flex flex-row justify-around items-center p-2 rounded-lg">
        <div className="text-[#01B574] text-sm">ALIVE</div>
        <div className="text-3xl">{aliveCount}</div>
      </div>
      <div className="border border-[#FF3636] flex flex-row justify-around items-center p-2 rounded-lg">
        <div className="text-[#FF3636] text-sm">DEAD</div>
        <div className="text-3xl">{idleCount}</div>
      </div>
    </div>
  );
};

export default NodeStats;
