"use client";

import Card from "@/components/card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden relative">
      <main className="flex-grow">
        <div className="mx-8 p-2 mt-5 flex flex-col justify-center items-center gap-10">
          <div className="text-3xl"><h1>Welcome to ZKAGI</h1></div>
          <div><Card/></div>
        </div>
      </main>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-8" >
        <div className="w-2/6 h-60 bg-[#643ADE] rounded-t-full blur-[120px] drop-shadow-lg"></div>
      </div>
    </div>
  );
}
