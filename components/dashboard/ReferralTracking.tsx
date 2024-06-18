import React from "react";
import TotalEarningChart from "../graphs/TotalEarningChart";
import { Copy } from "../icons/Copy";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "sonner";

const ReferralTracking: React.FC = () => {
  return (
    <div>
      <div>Referral Tracking</div>
      <div className="bg-[#060B28] rounded-lg p-4 h-64">
        <div className="flex flex-col justify-center items-center">
          {/* <div className="flex flex-col gap-2">
            <div className="bg-[#171D3D] rounded-lg p-2 px-4 flex flex-col justify-between flex-grow h-40">
              <div className="text-[#A0AEC0] text-sm">Referrals</div>
              <div className="text-right text-5xl">15</div>
            </div>
            <div className="bg-[#171D3D] rounded-lg w-3/4 p-2 px-4">
              <div className="text-[#A0AEC0] text-xs">Total Token</div>
              <div className="text-right">1466</div>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center text-center mt-1">
              <CopyToClipboard
                text="Referal link"
                onCopy={() => toast.success("Text copied to clipboard!")}
              >
                <div className="p-2 w-full text-white text-sm bg-[#171D3D] rounded-md flex flex-row justify-between">
                  <div>CODE:</div>
                  <div>XY1Z1</div>
                  <div className="p-1">
                    <Copy />
                  </div>
                </div>
              </CopyToClipboard>
              <div className="p-2 w-full text-[#7551FF] text-sm bg-[#171D3D] rounded-md">
                TWEET REFERRAL
              </div>
            </div>
          </div> */}
          <div className="flex flex-col justify-center items-center">
            <TotalEarningChart />
            <div className="flex justify-end items-end text-[#05B78E]">
              TOTAL EARNINGS
            </div>
          </div>
        </div>
        {/* <div className="mt-2">
          <div className="text-[#A09999] text-md">PENDING REFERRALS: 01</div>
        </div> */}
      </div>
    </div>
  );
};

export default ReferralTracking;
