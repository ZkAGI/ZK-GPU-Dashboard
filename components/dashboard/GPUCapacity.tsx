import React from 'react';
import UtilizationInfo from './UtilizationInfo';
import { BarData } from '../graphs/types';
import BarChart from '../graphs/BarGraph';

  const barData: BarData[] = [
    { time: "Jan", value: 5 },
    { time: "Feb", value: 12 },
    { time: "Mar", value: 18 },
    { time: "Apr", value: 20 },
    { time: "May", value: 24 },
    { time: "Jun", value: 22 },
    { time: "Aug", value: 18 },
  ];

const GPUCapacity: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <div>GPU Nodes Utilization</div>
      <div className="bg-[#060b28] p-2 rounded-md flex flex-col">
        <UtilizationInfo/>
        <div style={{ height: '250px', width: '100' }}> 
        <BarChart data={barData} />
        </div>
      </div>
    </div>
  );
}

export default GPUCapacity;
