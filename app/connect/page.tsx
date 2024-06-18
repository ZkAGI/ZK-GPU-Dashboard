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
    <div className="flex flex-col h-full overflow-x-hidden relative mr-4 p-2">
      <main className="flex-grow">
        {publicKey ? (
          <div>
            <div className="text-2xl">Connect New Device</div>
            <div className="p-4"> New Device</div>
            <div className="w-3/4 px-4 font-thin text-sm">Follow the steps below to connect your device. If you require assistance in connecting your device to the ZkAGI network, please reach out to our support team.</div>
            <div className="border border-[#ffffff1b] mx-4 my-2"></div>
           <ConnectOverview/>
          </div>
        ) : null
        }
      </main>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-8 pointer-events-none">
        <div className="w-2/6 h-60 bg-[#643ADE] rounded-t-full blur-[120px] drop-shadow-lg relative -z-10" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="mt-2 border-[#ffffff1b] border-b w-1/2 "> </div>
        <div className="text-white my-5">@ ZkAGI 2024</div>
      </div>
    </div>
  );
}
