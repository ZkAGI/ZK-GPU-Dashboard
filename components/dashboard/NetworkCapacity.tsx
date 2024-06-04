import React from 'react';
import NetworkCapacityChart from '../graphs/NetworkCapacityChart';

const TotalNetworkCapacity: React.FC = () => {
  return (
    <div>
      <div>Leaderboard</div>
      <div className="bg-[#060B28]  p-3 rounded-lg">
        {/* <div className="row-span-2 flex justify-center items-center"> */}
          {/* <NetworkCapacityChart /> */}
          <div className="flex flex-row justify-around items-center">
            <div className='border rounded-lg px-2 py-1 text-xl'>20 : 30 : 15 : 12</div>
            <div className="size-8 rounded-full bg-[#643ADE] border-2 border-white"></div>
          </div>
        {/* </div> */}
        {/* <div className="p-2 text-xs rounded-lg bg-[#171D3D] m-2">
          <p>Network capacity</p>
        </div> */}
        <div className="flex flex-row w-full justify-between">
          <div className="bg-[#171D3D] flex flex-col justify-center items-center px-2 rounded-t-full mt-4">
            <div className="size-10 bg-white rounded-full flex flex-col justify-between -translate-y-7  border-4 border-[#9747FF]"/>
            <div className="text-[10px] mb-1">Trident</div>
            <div className="text-xs mb-1">14430</div>
            <div className="text-[8px] mb-1">@username</div>
          </div>
          <div className="bg-[#171D3D] flex flex-col justify-center items-center p-1 px-2 rounded-t-full mt-7">
            <div className="size-10 bg-white rounded-full flex flex-col justify-between -translate-y-5  border-4 border-[#9747FF]"/>
            <div className="text-[10px] mb-1">Trident</div>
            <div className="text-xs mb-1">14430</div>
            <div className="text-[8px] mb-1">@username</div>
          </div>
          <div className="bg-[#171D3D] flex flex-col justify-center items-center p-1 px-2 rounded-t-full mt-12">
            <div className="size-10 bg-white rounded-full flex flex-col justify-between -translate-y-3  border-4 border-[#9747FF]"/>
            <div className="text-[10px] mb-1">Trident</div>
            <div className="text-xs mb-1">14430</div>
            <div className="text-[8px] mb-1">@username</div>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-6 hover:bg-[#1E2237] p-1 rounded">
            <div className="flex justify-center items-center">
            <div className="size-7 bg-white rounded-full flex flex-col justify-center items-center mr-1"/>
            </div>
            <div className="col-span-2">
              <div className='text-xs'>Siri</div>
              <div className='text-[8px] text-[#B7B3B3]'>@username</div>
            </div>
            <div className="col-span-2 text-[#009BD6]">1700 xp</div>
            <div className='text-center flex flex-col justify-center items-center'>
              <div className="text-xs">197</div>
              {/* <div className='bg-white rounded-full size-2'/> */}
              <div className="w-3 h-2 bg-[#FF3636] clip-triangle"></div>
            </div>
          </div>
          <div className="grid grid-cols-6 hover:bg-[#1E2237] p-1 rounded">
            <div className="flex justify-center items-center">
            <div className="size-7 bg-white rounded-full flex flex-col justify-center items-center mr-1"/>
            </div>
            <div className="col-span-2">
              <div className='text-xs'>XYZ</div>
              <div className='text-[8px] text-[#B7B3B3]'>@username</div>
            </div>
            <div className="col-span-2 text-[#009BD6]">1200 xp</div>
            <div className='text-center flex flex-col justify-center items-center'>
              <div className="text-xs">190</div>
              {/* <div className='bg-white rounded-full size-2'/> */}
              <div className="w-3 h-2 bg-[#FF3636] clip-triangle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TotalNetworkCapacity;
