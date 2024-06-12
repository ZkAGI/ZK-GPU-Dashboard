import React from 'react';
import { GPU } from '../icons/GPU';

const GPUComponent = () => {

  return (
    <div className='flex flex-row bg-[#171D3D] p-3 rounded-lg w-60'>
      <div className="flex justify-center items-center"><GPU/></div>
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

// import React from 'react';
// import { GPU } from '../icons/GPU';

// interface GPUComponentProps {
//   name: string;
//   key: React.Key;
// }

// const GPUComponent: React.FC<GPUComponentProps> = ({ name, key }) => {
//   return (
//     <div key={key} className='flex flex-row bg-[#171D3D] p-3 rounded-lg w-60'>
//       <div className="flex justify-center items-center"><GPU /></div>
//       <div>
//         <div className='text-xs'>{name}</div>
//         <div>
//           <div className='text-[9px] flex flex-row gap-1 my-0.5'>
//             <div className='bg-[#01B574] rounded-full size-2 flex my-0.5' />
//             <div>CONNECTED</div>
//           </div>
//           <div className='text-[#01B574] text-[8px]'>Connected 32 minutes ago</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GPUComponent;