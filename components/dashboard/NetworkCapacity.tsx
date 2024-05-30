import React from 'react';
import NetworkCapacityChart from '../graphs/NetworkCapacityChart';

const TotalNetworkCapacity: React.FC = () => {
  return (
    <div>
      <div>Total Network Capacity</div>
      <div className="bg-[#060B28] grid grid-rows-3 p-3 rounded-lg">
        <div className="row-span-2 flex justify-center items-center">
          <NetworkCapacityChart />
        </div>
        <div className="p-2 text-xs rounded-lg bg-[#171D3D] m-2">
          <p>Network capacity</p>
        </div>
      </div>
    </div>
  );
}

export default TotalNetworkCapacity;
