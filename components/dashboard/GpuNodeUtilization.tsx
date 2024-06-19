import React, { useMemo } from 'react';
import LineChart, { LineData } from '../graphs/LineChart';
import UtilizationInfo from './UtilizationInfo';
import useSWR from 'swr';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const GPUNodesUtilization: React.FC = () => {
  const { data, error } = useSWR(`${BASE_URL}/api/dailystats`, {
    refreshInterval: 8000,
  });

  const lineData: LineData[] = useMemo(() => {
    if (!data) return [];

    return [
      {
        id: "totalActiveNodes",
        data: data.map((entry: { date: string, data: { totalActiveNodes: number } }) => ({
          x: entry.date,
          y: entry.data.totalActiveNodes
        }))
      }
    ];
  }, [data]);

  return (
    <div className="flex flex-col gap-2">
      <div>GPU Nodes Utilization</div>
      <div className="bg-[#060b28] p-2 rounded-md flex flex-col">
        <UtilizationInfo />
        <div style={{ height: '250px', width: '100%', maxHeight: '250px', maxWidth: '100%' }}>
          <LineChart data={lineData} />
        </div>
      </div>
    </div>
  );
}

export default GPUNodesUtilization;
