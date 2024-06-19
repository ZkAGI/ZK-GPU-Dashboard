import React from "react";
import NetworkCapacityChart from "../graphs/NetworkCapacityChart";
import useSWR from "swr";
import { useWallet } from "@solana/wallet-adapter-react";

interface LeaderboardItem {
  total_xp: number;
  wallet_address: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const TotalNetworkCapacity: React.FC = () => {
  const { data, error } = useSWR(`${BASE_URL}/leaderboard`, {
    refreshInterval: 8000,
  });

  const { wallet } = useWallet();
  const walletAddress = wallet?.adapter?.publicKey?.toString();

  const sortedData = Array.isArray(data) ? [...data].sort((a, b) => b. total_xp - a. total_xp) : [];

  const userIndex = sortedData.findIndex(
    (item) => item.wallet_address === walletAddress
  );

  const renderLeaderboardItem = (item: LeaderboardItem, index: number) => (
    <div
      key={index}
      className="flex flex-row justify-between hover:bg-[#1E2237] p-1 rounded mt-3"
    >
      {/* <div className="flex justify-center items-center">
        <div className="size-7 bg-white rounded-full flex flex-col justify-center items-center mr-1" />
      </div> */}
      <div className="col-span-2">
        <div className="text-xs">
          {item.wallet_address.slice(0, 4)}...
          {item.wallet_address.slice(40, item.wallet_address.length)}
        </div>
        {/* <div className="text-[8px] text-[#B7B3B3]">@username</div> */}
      </div>
      <div className="col-span-2 text-[#009BD6]">{item.total_xp} xp</div>
      {/* <div className="text-center flex flex-col justify-center items-center">
        <div className="text-xs">197</div>
        <div className="w-3 h-2 bg-[#FF3636] clip-triangle" />
      </div> */}
    </div>
  );

  return (
    <div className="">
      <div>Leaderboard</div>
      <div className="bg-[#060B28] p-3 rounded-lg my-1">
        {/* <div className="flex flex-row justify-center items-center gap-5">
          <div className="border rounded-lg px-2 py-1 text-xl">20 : 30 : 15 : 12</div>
          <div className="size-8 rounded-full bg-[#643ADE] border-2 border-white" />
        </div> */}
        <div className="flex flex-row flex-grow justify-end items-end gap-3 h-28 p-1 mt-4">
          {sortedData.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className={`bg-[#171D3D] flex flex-col ${
                index === 0 ? "h-full" : index === 1 ? "h-[96px]" : "h-[80px]"
              } justify-center items-center p${
                index !== 2 ? "x-2" : ""
              } rounded-t-full flex-grow`}
            >
              <div
                className={`size-12 flex flex-col justify-between text-center pt-3 transform rotate-45 rounded-xl ${
                  index === 0
                    ? "-translate-y-6"
                    : index === 1
                    ? "-translate-y-5"
                    : "-translate-y-3"
                } ${index === 2 ? "shrink-0" : ""}`}
                style={{ backgroundColor: index === 0 ? "#9747FF" : "#6F43F3" }}
              >
                <div className="transform -rotate-45">{index + 1}</div>
              </div>
              {/* <div className={`text-[${index === 2 ? '9px' : '10px'}] mb-1`}>Trident</div> */}
              <div
                className={`mb-px`} //text-[${index === 0 ? "#9747FF" : "#009BD6"}]
                style={{ color: index === 0 ? "#9747FF" : "#009BD6" }}
              >
                {item.total_xp}
              </div>
              <div className="text-[8px] mb-1">
                @{item.wallet_address.slice(0, 4)}...
                {item.wallet_address.slice(40, item.length)}
              </div>
            </div>
          ))}
        </div>
        <div>
          {/* {userIndex !== -1 &&
            sortedData
              .slice(Math.max(0, userIndex - 1), userIndex + 2)
              .map(renderLeaderboardItem)} */}
              {userIndex !== -1 ? (
            sortedData
              .slice(Math.max(0, userIndex - 1), userIndex + 2)
              .map(renderLeaderboardItem)
          ) : (
            <div className="p-2 text-center h-24">Contribute your GPU to be on the leaderboard</div>
          )}
        </div>
        {/* <div>
          {userIndex !== -1 &&
            sortedData
              .slice(
                userIndex === 0 ? userIndex : Math.max(0, userIndex - 1),
                userIndex === 0 ? userIndex + 3 : userIndex + 2
              )
              .map(renderLeaderboardItem)}
        </div> */}
      </div>
    </div>
  );
};

export default TotalNetworkCapacity;
