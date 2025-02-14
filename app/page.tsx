"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import CapacityOverview from "@/components/dashboard/CapacityOverview";
import GpuContribution from "@/components/dashboard/GpuContribution";
import NetworkCapacity from "@/components/dashboard/NetworkCapacity";
import ReferralTracking from "@/components/dashboard/ReferralTracking";
import WelcomeSection from "@/components/Welcome";
import GPUNodesUtilization from "@/components/dashboard/GpuNodeUtilization";
import GPUCapacity from "@/components/dashboard/GPUCapacity";
import Utilization from "@/components/dashboard/Utilization";
import Events from "@/components/dashboard/Events";

export default function Home() {
  const { connection } = useConnection();
  const { publicKey, } = useWallet();

  return (
    <div className="flex flex-col h-full overflow-x-hidden relative mx-4">
      <main className="">
        {publicKey ? (
          <div className="flex flex-col w-full mb-2">
            <div className=" flex flex-col lg:flex-row gap-2 p-2">
              <div className="text-white p-1 flex-grow">
                <CapacityOverview />
              </div>
              <div className="text-white rounded-lg p-1 flex-grow">
                <GpuContribution />
              </div>
              <div className=" lg:col-span-2 text-white p-1 flex-grow">
                <ReferralTracking />
              </div>
              <div className="text-white rounded-lg p-1 flex-grow">
                <NetworkCapacity />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-2 w-full mb-7">
              <div className=" text-white rounded-lg p-1 flex-grow">
                <GPUNodesUtilization />
              </div>
              <div className=" text-white rounded-lg p-1 flex-grow">
                <GPUCapacity />
              </div>
              <div className=" text-white rounded-lg p-1 flex-grow">
                <Utilization />
              </div>
            </div>
            {/* <div className=" p-2">
              <div className="col-span-3 text-white rounded-lg p-1">
                <Events />
              </div>
            </div> */}
          </div>
        ) : (
          <WelcomeSection />
        )}
      </main>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-8 pointer-events-none">
        <div className="w-2/6 h-60 bg-[#643ADE] rounded-t-full blur-[100px] drop-shadow-lg relative -z-10" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="mt-2 border-[#ffffff1b] border-b w-1/2 "> </div>
        <div className="text-white my-5 font-ttfirs">@ZkAGI 2025</div>
      </div>
    </div>
  );
}
