import React from 'react';
import TotalEarningChart from '../graphs/TotalEarningChart';

const ReferralTracking: React.FC = () => {
  return (
    <div>
      <div>Referral Tracking</div>
      <div className="bg-[#060B28] rounded-lg p-4">
        <div className="grid grid-cols-2">
          <div className="grid grid-rows-2 gap-2">
            <div className="bg-[#171D3D] rounded-lg w-3/4 p-2 px-4">
              <div className="text-[#A0AEC0] text-xs">Referrals</div>
              <div className="text-right">15</div>
            </div>
            <div className="bg-[#171D3D] rounded-lg w-3/4 p-2 px-4">
              <div className="text-[#A0AEC0] text-xs">Total Token</div>
              <div className="text-right">1466</div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <TotalEarningChart />
          </div>
        </div>
        <div className="mt-2">
          <div className="text-[#A09999] text-md">PENDING REFERRALS: 01</div>
        </div>
        <div className="grid grid-cols-2 gap-2 justify-center text-center mt-1">
          <div className="p-2 w-full text-[#7551FF] text-sm bg-[#171D3D] rounded-md">
            COPY REFERRAL LINK
          </div>
          <div className="p-2 w-full text-[#7551FF] text-sm bg-[#171D3D] rounded-md">
            TWEET REFERRAL
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReferralTracking;
