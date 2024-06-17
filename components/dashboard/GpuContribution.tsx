import React, { useEffect, useState } from 'react';
import RadialBarChart from '../graphs/RadialBarChart';
import axios from 'axios';
import { useWallet } from '@solana/wallet-adapter-react';
import useSWR from 'swr';

const GPUContribution: React.FC = () => {
  const { wallet } = useWallet();
  const walletAddress = wallet?.adapter?.publicKey?.toString();
  const [list, setList] = useState([]);
  const { data, error } = useSWR('https://zynapse.zkagi.ai/api/nodes', { refreshInterval: 1000 });
  const [aliveCount, setAliveCount] = useState(0);

  useEffect(() => {
    if (data) {
      const clusterData = data?.data?.summary;
      if (clusterData) {
        const aliveNodes = clusterData.filter((node: any) => node.raylet.state === 'ALIVE').length;
        setAliveCount(aliveNodes);
      }
    }
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await axios({
          method: "GET",
          url: `https://zynapse.zkagi.ai/wallets/${walletAddress}/ip_addresses`,
          data: {},
          headers: {
            "Content-Type": "application/json",
            "api-key": "zk-123321",
          },
        });
        if (response.status === 200) {
          const ipResponse: any = await axios({
            method: "GET",
            url: `https://zynapse.zkagi.ai/ips/${response.data.ip_addresses[0]}/nodes`,
            data: {},
            headers: {
              "Content-Type": "application/json",
              "api-key": "zk-123321",
            },
          });
          if (ipResponse.status === 200) {
            setList(ipResponse.data);
          } else {
            setList([]);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [walletAddress]);

  return (
    <div>
      <div>GPU Contribution</div>
      <div className="bg-[#060b28] flex flex-col justify-center p-2 rounded-lg">
        <div className="h-48 flex justify-center items-center">
          <RadialBarChart aliveCount={aliveCount} gpuCount={list.length}/>
        </div>
        <div className="w-full p-4 text-xs rounded-xl bg-[#171D3D] mb-0.5">
          {list.length > 0 ? (
            list.map((gpu, index) => <div key={index}>{gpu}</div>)
          ) : (
            <div className="flex justify-center items-center text-center">You have no GPUs yet!</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GPUContribution;