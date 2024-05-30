import React from 'react';

const GPUComponent = () => {
  return (
    <div className='flex flex-row gap-3 bg-[#171D3D] p-3 rounded-lg w-5/6'>
      <div className="border rounded-md bg-white size-10">img</div>
      <div>
        <div className='text-xs'>Nvidia RTX 4090 24 GB</div>
        <div>
          <div className='text-[9px] flex flex-row gap-1 my-0.5'>
            <div className='bg-[#01B574] rounded-full size-2 flex my-0.5' />
            <div>CONNECTED</div>
          </div>
          <div className='text-[#01B574] text-[8px]'>Connected 32 minutes ago</div>
        </div>
      </div>
    </div>
  );
};

export default GPUComponent;
