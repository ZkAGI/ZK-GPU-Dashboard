"use client";

import { CustomWalletButtons } from "@/components/CustomWalletButton";
import Card from "../components/card";
import { Illustration } from "../components/icons/Illustration";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
// import Chart from "@/components/graphs/Chart";
// import { RadialBarChart } from "@/components/graphs/RadialBarChart";
import { CustomGauge } from "@/components/graphs/Chart";
import RadialBarChart from "@/components/graphs/RadialBarChart";
import NetworkCapacityChart from "@/components/graphs/NetworkCapacityChart";
import TotalEarningChart from "@/components/graphs/TotalEarningChart";
import BarChart from "@/components/graphs/BarGraph";
import { BarData } from "@/components/graphs/types";
import LineChart, { LineData, LineDatum } from "@/components/graphs/LineChart";
import CapacityOverview from "@/components/dashboard/CapacityOverview";
import GpuContribution from "@/components/dashboard/GpuContribution";
import NetworkCapacity from "@/components/dashboard/NetworkCapacity";
import ReferralTracking from "@/components/dashboard/ReferralTracking";
import WelcomeSection from "@/components/Welcome";

export default function Home() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const barData: BarData[] = [
    { time: "Jan", value: 5 },
    { time: "Feb", value: 12 },
    { time: "Mar", value: 18 },
    { time: "Apr", value: 20 },
    { time: "May", value: 24 },
    { time: "Jun", value: 22 },
    { time: "Aug", value: 18 },
  ];

  const sampleData: LineData[] = [
    {
      id: "series1",
      data: [
        { x: "2021-01-01", y: 10 },
        { x: "2021-02-01", y: 5 },
        { x: "2021-03-01", y: 30 },
        { x: "2021-04-01", y: 15 },
        { x: "2021-05-01", y: 20 },
      ],
    },
  ];

  return (
    <div className="flex flex-col h-screen overflow-x-hidden relative mr-4">
      <main className="flex-grow">
        {publicKey ? (
          <div className="grid grid-rows-2 gap-2 w-full mb-2">
            <div className=" grid grid-cols-5 gap-2 p-2">
              <div className="text-white p-1">
                <CapacityOverview/>
              </div>
              <div className="text-white rounded-lg p-1">
                <GpuContribution/>
              </div>
              <div className="text-white rounded-lg p-1">
                <NetworkCapacity/>
              </div>
              <div className=" col-span-2 text-white p-1">
                <ReferralTracking/>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-2 w-full">
              <div className="border col-span-3 text-white rounded-lg p-1">
                {/* <div className="flex flex-col gap-2">
                  <div>GPU Nodes Utilization</div>
                  <div className="border bg-[#060b28] h-100">
                    <LineChart data={sampleData} />
                  </div>
                </div> */}
                 <LineChart data={sampleData} />
              </div>
              <div className="col-span-2 border">
                <BarChart data={barData} />
              </div>
              <div className="border">3</div>
            </div>
          </div>
        ) : (
          <WelcomeSection/>
        )}
      </main>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-8">
        <div className="w-2/6 h-60 bg-[#643ADE] rounded-t-full blur-[120px] drop-shadow-lg relative" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="mt-2 border-[#ffffff1b] border-b w-1/2 "> </div>
        <div className="text-white my-5">@ ZkAGI 2024</div>
      </div>
    </div>
  );
}
