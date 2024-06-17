import React, { useEffect, useState } from 'react';
import RadialBarChart from '../graphs/RadialBarChart';
import axios from 'axios';
import { useWallet } from '@solana/wallet-adapter-react';
import useSWR from 'swr';
import { memoryConverter } from '@/utils/memoryConverter';

interface Node {
  node_ids: string[];
}

const GPUContribution: React.FC = () => {
  const { wallet } = useWallet();
  const walletAddress = wallet?.adapter?.publicKey?.toString();
  const [list, setList] = useState<Node>({ node_ids: [] });
  const [selectedIp, setSelectedIp] = useState<string>('');
  const { data: nodesData, error: nodesError } = useSWR('https://zynapse.zkagi.ai/api/nodes', { refreshInterval: 1000 });
  const { data: gpuData, error: gpuError } = useSWR('https://zynapse.zkagi.ai/api/dailystats', { refreshInterval: 8000 });
  const [aliveCount, setAliveCount] = useState(0);
  const [gpuCount, setGpuCount] = useState(0);

  useEffect(() => {
    if (gpuData) {
      const latestData = gpuData[gpuData.length - 1];
      if (latestData?.data?.totalGpusMemoryGB) {
        setAliveCount(latestData.data.totalGpusMemoryGB);
      }
    }
  }, [gpuData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "GET",
           url: `https://zynapse.zkagi.ai/wallets/${walletAddress}/ip_addresses`,
          headers: {
            "Content-Type": "application/json",
            "api-key": "zk-123321",
          },
        });
        if (response.status === 200) {
          const ipResponse = await axios({
            method: "GET",
             url: `https://zynapse.zkagi.ai/ips/${response.data.ip_addresses[0]}/nodes`,
            headers: {
              "Content-Type": "application/json",
              "api-key": "zk-123321",
            },
          });
          if (ipResponse.status === 200) {
            setList(ipResponse.data);
            setSelectedIp(response.data.ip_addresses[0]);
          } else {
            setList({ node_ids: [] });
            setSelectedIp('');
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [walletAddress]);

  useEffect(() => {
    if (nodesData && selectedIp) {
      const clusterData = nodesData?.data?.summary;
      if (clusterData) {
        const totalGpuMemory = clusterData.reduce((totalMemory: number, node: any) => {
          if (node.ip === selectedIp) {
            return totalMemory + (Array.isArray(node.gpus) ? node.gpus.reduce((gpuTotal: number, gpu: any) => gpuTotal + (gpu?.memoryTotal ? Number(gpu.memoryTotal) / 1024 : 0), 0) : 0);
          }
          return totalMemory;
        }, 0);
        setGpuCount(totalGpuMemory.toFixed(2));
      }
    }
  }, [nodesData, selectedIp]);

  console.log('list', list);

  return (
    <div>
      <div>GPU Contribution</div>
      <div className="bg-[#060b28] flex flex-col justify-center p-2 rounded-lg">
        <div className="h-48 flex justify-center items-center">
          <RadialBarChart aliveCount={aliveCount} gpuCount={gpuCount} />
        </div>
        <div className="w-full p-4 text-xs rounded-xl bg-[#171D3D] mb-0.5">
          {list.node_ids.length > 0 ? (
            list.node_ids.map((nodeId, index) => <div key={index}>{nodeId}</div>)
          ) : (
            <div className="flex justify-center items-center text-center">You have no GPUs yet!</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GPUContribution;
