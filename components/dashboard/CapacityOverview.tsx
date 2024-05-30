import React from 'react';

const CapacityOverview: React.FC = () => {
  return (
    <div>
      <div>Total Capacity</div>
      <div className="grid grid-cols-2 justify-center items-center p-4 rounded-lg bg-gradient-to-br from-[#14163e] via-[#1c1d4e] to-[#1c1e51] mb-4 mt-2">
        <div>GPU</div>
        <div className="flex flex-row gap-2">
          <p className="text-3xl text-[#0075FF] mt-1">14.2</p>
          <p className="mt-5 text-xs">Gbps</p>
        </div>
      </div>
      <div className="grid grid-cols-2 justify-center items-center p-4 rounded-lg bg-gradient-to-br from-[#14163e] via-[#1c1d4e] to-[#1c1e51] mb-4 mt-2">
        <div>CPU</div>
        <div className="flex flex-row gap-2">
          <p className="text-3xl text-[#0075FF] mt-1">5.71</p>
          <p className="mt-5 text-xs">Gbps</p>
        </div>
      </div>
      <div className="grid grid-cols-2 justify-center items-center p-4 rounded-lg bg-gradient-to-br from-[#14163e] via-[#1c1d4e] to-[#1c1e51]">
        <div>NODE</div>
        <div className="flex flex-row">
          <p className="text-3xl text-[#0075FF]">121</p>
          <p></p>
        </div>
      </div>
    </div>
  );
}

export default CapacityOverview;
