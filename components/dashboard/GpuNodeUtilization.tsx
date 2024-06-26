import React, { useMemo, useState } from 'react';
import LineChart, { LineData } from '../graphs/LineChart';
import UtilizationInfo from './UtilizationInfo';
import useSWR from 'swr';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const GPUNodesUtilization: React.FC = () => {
  const { data, error } = useSWR(`${BASE_URL}/api/dailystats`, {
    refreshInterval: 8000,
  });

  const [filter, setFilter] = useState<'day' | 'week' | 'month'>('day');

  const getWeeksInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    return Math.ceil((firstDay + lastDate) / 7);
  };

  const getMonthName = (monthIndex: number) => {
    const date = new Date();
    date.setMonth(monthIndex);
    return date.toLocaleString('default', { month: 'long' });
  };

  const getMonthsInYear = (date: Date) => {
    return date.getMonth() + 1; // Since month is 0-indexed, adding 1 to get 1-indexed month count
  };

  const filterData = (data: any, filter: 'day' | 'week' | 'month'): LineData[] => {
    if (!data) return [];

    const now = new Date();

    if (filter === 'day') {
      const pastWeekData = data.filter((entry: { date: string }) => {
        const entryDate = new Date(entry.date);
        return (now.getTime() - entryDate.getTime()) / (1000 * 3600 * 24) <= 7;
      });
      return [
        {
          id: "totalActiveNodes",
          data: pastWeekData.map((entry: { date: string, data: { totalActiveNodes: number } }) => ({
            x: entry.date,
            y: entry.data.totalActiveNodes,
          }))
        }
      ];
    } else if (filter === 'week') {
      const weeksData: any[] = [];
      const currentMonthWeeks = getWeeksInMonth(now);
      const monthName = getMonthName(now.getMonth());

      for (let i = 0; i < currentMonthWeeks; i++) {
        const startOfWeek = new Date(now.getFullYear(), now.getMonth(), i * 7 + 1);
        const endOfWeek = new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000);

        // Exclude future weeks
        if (startOfWeek > now) break;

        const weekData = data.filter((entry: { date: string }) => {
          const entryDate = new Date(entry.date);
          return entryDate >= startOfWeek && entryDate <= endOfWeek;
        });

        if (weekData.length > 0) {
          const weekAvg = weekData.reduce((acc: number, curr: any) => acc + curr.data.totalActiveNodes, 0) / weekData.length;
          weeksData.push({
            x: `${String(i + 1).padStart(2, '0')}/${monthName}`,
            y: Math.floor(weekAvg)
          });
        } else {
          weeksData.push({
            x: `${String(i + 1).padStart(2, '0')}/${monthName}`,
            y: 0
          });
        }
      }
      return [
        {
          id: "totalActiveNodes",
          data: weeksData.reverse() // to show data in chronological order
        }
      ];
    } else if (filter === 'month') {
      const monthsData: any[] = [];
      const currentYearMonths = getMonthsInYear(now);

      for (let i = 0; i < currentYearMonths; i++) {
        const startOfMonth = new Date(now.getFullYear(), i, 1);
        const endOfMonth = new Date(now.getFullYear(), i + 1, 0);

        // Exclude future months
        if (startOfMonth > now) break;

        const monthData = data.filter((entry: { date: string }) => {
          const entryDate = new Date(entry.date);
          return entryDate >= startOfMonth && entryDate <= endOfMonth;
        });

        if (monthData.length > 0) {
          const monthAvg = monthData.reduce((acc: number, curr: any) => acc + curr.data.totalActiveNodes, 0) / monthData.length;
          monthsData.push({
            x: `${startOfMonth.toLocaleString('default', { month: 'short' })}/${startOfMonth.getFullYear()}`,
            y: Math.floor(monthAvg)
          });
        } else {
          monthsData.push({
            x: `${startOfMonth.toLocaleString('default', { month: 'short' })}/${startOfMonth.getFullYear()}`,
            y: 0
          });
        }
      }
      return [
        {
          id: "totalActiveNodes",
          data: monthsData
        }
      ];
    }

    // Return an empty array as a fallback
    return [];
  };

  const lineData: LineData[] = useMemo(() => filterData(data, filter), [data, filter]);

  return (
    <div className="flex flex-col gap-2">
      <div>GPU Nodes Utilization</div>
      <div className="bg-[#060b28] p-2 rounded-md flex flex-col">
        <UtilizationInfo filter={filter} setFilter={setFilter} data={data} type="nodes"/>
        <div style={{ height: '250px', width: '100%', maxHeight: '250px', maxWidth: '100%' }}>
          <LineChart data={lineData} filter={filter} />
        </div>
      </div>
    </div>
  );
}

export default GPUNodesUtilization;
