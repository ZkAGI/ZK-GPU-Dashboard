import React from 'react';
import LineChart, { LineData } from '../graphs/LineChart';
import UtilizationInfo from './UtilizationInfo';
import useSWR from 'swr';

const sampleData: LineData[] = [
    {
      id: "series1",
      data: [
        { x: "2021-01-01", y: 10 },
        { x: "2021-02-01", y: 5 },
        { x: "2021-03-01", y: 30 },
        { x: "2021-04-01", y: 15 },
        { x: "2021-05-01", y: 20 },
      ],
    },
  ];

const GPUNodesUtilization: React.FC = () => {
  const { data, error } = useSWR("https://zynapse.zkagi.ai/api/useractivities", {
    refreshInterval: 8000,
  });
  console.log('line',data)
  return (
    <div className="flex flex-col gap-2">  
      <div>GPU Nodes Utilization</div>
      <div className="bg-[#060b28] p-2 rounded-md flex flex-col">
        <UtilizationInfo/>
        <div style={{ height: '250px', width: '60' }}> 
          <LineChart data={sampleData} />
        </div>
      </div>
    </div>
  );
}

export default GPUNodesUtilization;
