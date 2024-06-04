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
import { Illustration } from "../components/icons/Illustration";
import { useEffect, useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";


export default function Home() {
  const { connection } = useConnection();
  const { publicKey, } = useWallet();

//   const [balance, setBalance] = useState<number>(0);
 
// useEffect(() => {
//   if (publicKey) {
//     (async function getBalanceEvery10Seconds() {
//       const newBalance = await connection.getBalance(publicKey);
//       console.log('Connection:', newBalance);
//       setBalance(newBalance / LAMPORTS_PER_SOL);
//       setTimeout(getBalanceEvery10Seconds, 10000);
//     })();
//   }
// }, [publicKey, connection, balance]);

// console.log('balance',balance)

  return (
    <div className="flex flex-col h-full overflow-x-hidden relative mr-4">
      <main className="">
        {publicKey ? (
          <div className="flex flex-col w-full mb-2">
            <div className=" grid grid-cols-5 gap-2 p-2">
              <div className="text-white p-1">
                <CapacityOverview />
              </div>
              <div className="text-white rounded-lg p-1">
                <GpuContribution />
              </div>
              <div className=" col-span-2 text-white p-1">
                <ReferralTracking />
              </div>
              <div className="text-white rounded-lg p-1">
                <NetworkCapacity />
              </div>
            </div>
            <div className="grid grid-cols-8 gap-2 w-full">
              <div className="col-span-3 text-white rounded-lg p-1">
                <GPUNodesUtilization />
              </div>
              <div className="col-span-3 gap-2">
                <div className="col-span-3 text-white rounded-lg p-1">
                  <GPUCapacity />
                </div>
              </div>
              <div className="col-span-2">
                <div className="col-span-3 text-white rounded-lg p-1">
                  <Utilization />
                </div>
              </div>
            </div>
            <div className=" p-2">
              <div className="col-span-3 text-white rounded-lg p-1">
                <Events />
              </div>
            </div>
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
        <div className="text-white my-5">@ ZkAGI 2024</div>
      </div>
    </div>
  );
}
