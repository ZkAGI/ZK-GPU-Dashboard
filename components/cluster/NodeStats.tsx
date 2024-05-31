import React from 'react';

const NodeStats: React.FC = () => {
  return (
    <div className="grid grid-cols-3 justify-between gap-6 w-5/12 mb-6">
      <div className="border flex flex-row justify-around items-center p-2 rounded-lg">
        <div className="text-sm">TOTAL</div>
        <div className="text-3xl">05</div>
      </div>
      <div className="border border-[#01B574] flex flex-row justify-around items-center p-2 rounded-lg">
        <div className="text-[#01B574] text-sm">ALIVE</div>
        <div className="text-3xl">04</div>
      </div>
      <div className="border border-[#FF3636] flex flex-row justify-around items-center p-2 rounded-lg">
        <div className="text-[#FF3636] text-sm">DEAD</div>
        <div className="text-3xl">01</div>
      </div>
    </div>
  );
};

export default NodeStats;
