import React, { useMemo } from 'react';

interface UtilizationInfoProps {
  filter: 'day' | 'week' | 'month';
  setFilter: (filter: 'day' | 'week' | 'month') => void;
  data: any;
  type: 'nodes' | 'capacity';
}

const UtilizationInfo: React.FC<UtilizationInfoProps> = ({ filter, setFilter, data, type }) => {
  const calculateChange = useMemo(() => {
    if (!data || data.length < 7) return 0;

    const last7Days = data.slice(-7);
    const firstDay = last7Days[0].data;
    const lastDay = last7Days[last7Days.length - 1].data;

    if (type === 'nodes') {
      return lastDay.totalActiveNodes - firstDay.totalActiveNodes;
    } else {
      return lastDay.totalGpusMemoryGB - firstDay.totalGpusMemoryGB;
    }
  }, [data, type]);

  const formatChange = (value: number) => {
    const sign = value > 0 ? '+' : '';
    const color = value > 0 ? 'text-green-500' : value < 0 ? 'text-red-500' : 'text-gray-400';
    return { sign, color, value: type === 'capacity' ? value.toFixed(2) : Math.abs(value) };
  };

  const changeFormatted = formatChange(calculateChange);

  return (
    <div className='flex flex-row justify-between px-2'>
      <div>
        <div>Utilization Overview</div>
        <div className='text-gray-400 text-xs'>
          <span className={changeFormatted.color}>
            {changeFormatted.sign}{changeFormatted.value} {type === 'nodes' ? 'node' : 'cores'}
            {type === 'nodes' && Math.abs(calculateChange) !== 1 ? 's' : ''}
          </span>
          {' in last 7 days'}
        </div>
      </div>
      <div className='grid grid-cols-3 gap-2 justify-center items-center'>
        <div
          onClick={() => setFilter('day')}
          className={`bg-[#1E2056] px-2 py-1 text-center rounded text-xs cursor-pointer ${
            filter === 'day' ? 'bg-[#0075FF] text-white' : 'bg-[#1E2056]'
          }`}
        >
          Day
        </div>
        <div
          onClick={() => setFilter('week')}
          className={`bg-[#1E2056] px-2 py-1 text-center rounded text-xs cursor-pointer ${
            filter === 'week' ? 'bg-[#0075FF] text-white' : 'bg-[#1E2056]'
          }`}
        >
          Week
        </div>
        <div
          onClick={() => setFilter('month')}
          className={`bg-[#1E2056] px-2 py-1 text-center rounded text-xs cursor-pointer ${
            filter === 'month' ? 'bg-[#0075FF] text-white' : 'bg-[#1E2056]'
          }`}
        >
          Month
        </div>
      </div>
    </div>
  );
}

export default UtilizationInfo;