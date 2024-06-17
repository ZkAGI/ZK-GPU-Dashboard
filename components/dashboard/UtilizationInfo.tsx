import React from 'react';

const UtilizationInfo: React.FC = () => {
  return (
    <div className='flex flex-row justify-between px-2'>
      <div>
        <div>Utilization Overview</div>
        <div className='text-gray-400 text-xs'>
          <span className='text-green-500'>+5 more</span> in last 7 days
        </div>
      </div>
      {/* <div className='grid grid-cols-3 gap-2 justify-center items-center'>
        <div className='bg-[#1E2056] px-2 py-1 text-center rounded text-xs'>Days</div>
        <div className='bg-[#1E2056] px-2 py-1 text-center rounded text-xs'>Week</div>
        <div className='bg-[#1E2056] px-2 py-1 text-center rounded text-xs'>Month</div>
      </div> */}
    </div>
  );
}

export default UtilizationInfo;
