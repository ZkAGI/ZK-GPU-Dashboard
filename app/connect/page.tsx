"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ClusterOverview from "@/components/cluster/ClusterOverview";
import { ConnectOverview } from "@/components/connect/ConnectOverview";

export default function Home() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const router = useRouter(); 

  useEffect(() => {
    if (!publicKey) {
      router.push("/");
    }
  }, [publicKey, router]);

  return (
    <div className="flex flex-col h-screen overflow-x-hidden relative mr-4">
      <main className="flex-grow">
        {publicKey ? (
          <div>
           <ConnectOverview/>
          </div>
        ) : null
        }
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
