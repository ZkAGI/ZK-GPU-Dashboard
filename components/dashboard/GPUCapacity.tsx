import React, { useMemo } from 'react';
import UtilizationInfo from './UtilizationInfo';
import { BarData } from '../graphs/types';
import BarChart from '../graphs/BarGraph';
import useSWR from 'swr';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const GPUCapacity: React.FC = () => {
  const { data, error } = useSWR(`${BASE_URL}/api/dailystats`, {
    refreshInterval: 8000,
  });

  const barData: BarData[] = useMemo(() => {
    if (!data) return [];

    return data.map((entry: { date: string, data: { totalGpusMemoryGB: number } }) => ({
      time: entry.date,
      value: entry.data.totalGpusMemoryGB,
    }));
  }, [data]);

  return (
    <div className="flex flex-col gap-2">
      <div>GPU Capacity Utilization</div>
      <div className="bg-[#060b28] p-2 rounded-md flex flex-col">
        <UtilizationInfo/>
        <div style={{ height: '250px', width: '100', maxHeight: '250px', maxWidth: '100%' }}> 
        <BarChart data={barData} />
        </div>
      </div>
    </div>
  );
}

export default GPUCapacity;