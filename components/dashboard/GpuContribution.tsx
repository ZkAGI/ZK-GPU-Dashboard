import React from 'react';
import RadialBarChart from '../graphs/RadialBarChart';

const GPUContribution: React.FC = () => {
  return (
    <div>
      <div>GPU Contribution</div>
      <div className="bg-[#060b28] grid grid-rows-3 justify-center p-2 rounded-lg">
        <div className="row-span-2 flex justify-center items-center">
          <RadialBarChart />
        </div>
        <div className="px-5 py-3 text-xs rounded-xl bg-[#171D3D] mb-0.5">
          <div>Nvidia RTX 4090 24 GB</div>
          <div>Nvidia RTX 4090 24 GB</div>
          <div>Nvidia RTX 4090 24 GB</div>
        </div>
      </div>
    </div>
  );
}

export default GPUContribution;
