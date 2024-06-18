import React from 'react';
import { GPU } from '../icons/GPU';

interface GPUComponentProps {
  nodeData: {
    active_time: string;
    node_id: string;
    status: string;
  };
  gpuName: string;
}

const GPUComponent: React.FC<GPUComponentProps> = ({ nodeData, gpuName }) => {
  const { active_time, status } = nodeData;

  const isConnected = status === 'connected';
  const statusText = isConnected ? 'Connected' : 'Disconnected';
  const statusColor = isConnected ? 'text-[#01B574]' : 'text-[#FF0000]';

  return (
    <div className='flex flex-row bg-[#171D3D] p-3 rounded-lg lg:w-60 w-3/4'>
      <div className="flex justify-center items-center"><GPU/></div>
      <div>
        <div className='text-xs'>{gpuName}</div>
        <div>
          <div className='text-[9px] flex flex-row gap-1 my-0.5'>
            <div className={`rounded-full size-2 flex my-0.5 ${isConnected ? 'bg-[#01B574]' : 'bg-[#FF0000]'}`} />
            <div className='text-white'>{status.toUpperCase()}</div>
          </div>
          <div className={`${isConnected ? 'text-[#01B574]' : 'text-[#FF0000]'} text-[8px]`}>{`${statusText} ${active_time} ago`}</div>
        </div>
      </div>
    </div>
  );
};

export default GPUComponent;

