"use client";

import { CustomWalletButtons } from "@/components/CustomWalletButton";
import Card from "../components/card";
import SvgIllustration from "../src/components/icons/Illustration";

export default function Home() {
  return (
    <div className="flex flex-col h-screen overflow-x-hidden relative mr-4">
      <main className="flex-grow">
        <div className="mx-8 p-2 mt-5 flex flex-col justify-center items-center gap-8">
          <div className="w-full flex flex-col justify-center items-center">
            <div className="text-3xl bg-gradient-to-r from-[#A4C8FF] via-[#A992ED] to-[#643ADE] bg-clip-text text-transparent">
              <h1 className="">Welcome to ZkAGI</h1>
            </div>
            <div className="mt-2 border-[#ffffff1b] border-b w-1/2"> </div>
          </div>
          <div>
            <Card />
          </div>
          <div className="mt-5">
            <CustomWalletButtons />
          </div>
          <div>
            <SvgIllustration className=" w-full h-full absolute inset-0 " />
          </div>
        </div>
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