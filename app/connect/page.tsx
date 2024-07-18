"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ClusterOverview from "@/components/cluster/ClusterOverview";
import { ConnectOverview } from "@/components/connect/ConnectOverview";
import { useFormStore } from "@/hooks/store/useConnectStore";
import { Edit } from "@/components/icons/Edit";
import { Save } from "@/components/icons/Save";

export default function Home() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [isEditing, setIsEditing] = useState(false);
  const [newDeviceName, setNewDeviceName] = useState("");
  const { deviceName, setDeviceName } = useFormStore();
  const router = useRouter(); 

  useEffect(() => {
    if (!publicKey) {
      router.push("/");
    }
  }, [publicKey, router]);

  const handleEditClick = () => {
    setIsEditing(true);
    setNewDeviceName(deviceName);
  };

  const handleSaveClick = () => {
    setDeviceName(newDeviceName);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col h-full overflow-x-hidden relative mr-4 p-2">
      <main className="flex-grow">
        {publicKey ? (
          <div>
            <div className="text-2xl">Connect New Device</div>
            <div className="text-lg flex items-center">
              {isEditing ? (
                <>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={newDeviceName}
                      onChange={(e) => setNewDeviceName(e.target.value)}
                      className="bg-[#171D3D] p-1 text-white pr-8"
                    />
                    <button 
                      onClick={handleSaveClick} 
                      className="absolute right-0 text-green-500"
                    >
                      <Save />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button onClick={handleEditClick} className="ml-4 mr-2 text-gray-400 py-2">
                    <Edit />
                  </button>
                  {deviceName}
                </>
              )}
            </div>
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