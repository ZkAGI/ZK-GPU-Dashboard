"use client";

import { CustomWalletButtons } from "@/components/CustomWalletButton";
import Card from "../components/card";
import { Illustration } from "../components/icons/Illustration";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

export default function Home() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  return (
    <div className="flex flex-col h-screen overflow-x-hidden relative mr-4">
      <main className="flex-grow">
        {publicKey ? (
          <div>hi</div>
        ) : (
          <div className="mx-8 p-2 mt-5 flex flex-col justify-center items-center gap-8">
            <div className="w-full flex flex-col justify-center items-center">
              <div className="text-3xl bg-gradient-to-r from-[#A4C8FF] via-[#A992ED] to-[#643ADE] bg-clip-text text-transparent">
                <h1
                  style={{
                    textShadow: " #A992ED 5px 5px 40px",
                  }}
                >
                  Welcome to ZkAGI
                </h1>
              </div>
              <div className="mt-2 border-[#ffffff1b] border-b w-1/2"> </div>
            </div>
            <div>
              <Card />
            </div>
            <div className="relative mt-5 rounded-md">
              <div className="absolute inset-0 bg-gradient-to-r from-[#A4C8FF] via-[#A992ED] to-[#643ADE] blur-lg rounded-md"></div>
              <div className="relative p-0.5">
                <CustomWalletButtons />
              </div>
            </div>

            <div>
              <Illustration />
            </div>
          </div>
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
