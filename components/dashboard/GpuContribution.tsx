import React, { useEffect, useState } from 'react';
import RadialBarChart from '../graphs/RadialBarChart';
import axios from 'axios';
import { useWallet } from '@solana/wallet-adapter-react';
import useSWR from 'swr';

interface Node {
  node_ids: string[];
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const KEY = process.env.API_KEY;

const GPUContribution: React.FC = () => {
  const { wallet } = useWallet();
  const walletAddress = wallet?.adapter?.publicKey?.toString();
  const [list, setList] = useState<Node>({ node_ids: [] });
  const [selectedIp, setSelectedIp] = useState<string>('');
  const { data: nodesData, error: nodesError } = useSWR(`${BASE_URL}/api/nodes`, { refreshInterval: 1000 });
  const { data: gpuData, error: gpuError } = useSWR(`${BASE_URL}/api/dailystats`, { refreshInterval: 8000 });
  const [aliveCount, setAliveCount] = useState(0);
  const [gpuCount, setGpuCount] = useState(0);
  const [gpuNames, setGpuNames] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: `${BASE_URL}/wallets/${walletAddress}/ip_addresses`,
          headers: {
            'Content-Type': 'application/json',
            "api-key": `${KEY}`
          },
        });
        if (response.status === 200) {
          const ipResponse = await axios({
            method: 'GET',
            url: `${BASE_URL}/ips/${response.data.ip_addresses[0]}/nodes`,
            headers: {
              'Content-Type': 'application/json',
              'api-key': `${KEY}`,
            },
          });
          if (ipResponse.status === 200) {
            const filteredNodeIds = ipResponse.data.node_ids.filter((nodeId: string) => {
              const node = nodesData?.data?.summary.find((node: any) => node.raylet.nodeId === nodeId);
              return node && node.raylet.state !== 'DEAD';
            });
            setList({ node_ids: filteredNodeIds });
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
  }, [walletAddress, nodesData]);

  useEffect(() => {
    if (nodesData) {
      const clusterData = nodesData?.data?.summary;
      if (clusterData) {
        const totalGpuMemory = clusterData.reduce((totalMemory: number, node: any) => {
          if (node.raylet.state !== 'DEAD') {
            return totalMemory + (Array.isArray(node.gpus) ? node.gpus.reduce((gpuTotal: number, gpu: any) => gpuTotal + (gpu?.memoryTotal ? Number(gpu.memoryTotal) / 1024 : 0), 0) : 0);
          }
          return totalMemory;
        }, 0);

        setAliveCount(Math.floor(totalGpuMemory));
      }
    }
  }, [nodesData]);

  useEffect(() => {
    if (nodesData && selectedIp) {
      const clusterData = nodesData?.data?.summary;
      if (clusterData) {
        const fetchGpuNames = async () => {
          await Promise.all(
            clusterData.map(async (node: any) => {
              if (node.ip === selectedIp) {
                try {
                  const response = await axios({
                    method: 'GET',
                    url: `${BASE_URL}/nodes/${node.raylet.nodeId}/active-time`,
                    headers: {
                      'Content-Type': 'application/json',
                      'api-key': `${KEY}`,
                    },
                  });
                  if (response.status === 200) {
                    const gpuName = node.gpus?.[0]?.name || 'Unknown GPU';
                    setGpuNames((prevNames) => ({ ...prevNames, [node.raylet.nodeId]: gpuName }));
                  } else {
                    console.log('Error fetching node active time', response);
                  }
                } catch (error) {
                  console.error('Error fetching GPU names', error);
                }
              }
            })
          );

          const totalGpuMemory = clusterData.reduce((totalMemory: number, node: any) => {
            if (node.ip === selectedIp && node.raylet.state !== 'DEAD') {
              return totalMemory + (Array.isArray(node.gpus) ? node.gpus.reduce((gpuTotal: number, gpu: any) => gpuTotal + (gpu?.memoryTotal ? Number(gpu.memoryTotal) / 1024 : 0), 0) : 0);
            }
            return totalMemory;
          }, 0);

          setGpuCount(totalGpuMemory);
        };

        fetchGpuNames();
      }
    }
  }, [nodesData, selectedIp]);

  return (
    <div>
      <div>GPU Contribution</div>
      <div className="bg-[#060b28] flex flex-col justify-center p-2 rounded-lg">
        <div className="h-48 flex justify-center items-center">
          <RadialBarChart aliveCount={aliveCount} gpuCount={gpuCount} />
        </div>
        <div className="w-full p-4 text-xs rounded-xl bg-[#171D3D] mb-0.5">
          {list.node_ids.length > 0 ? (
            list.node_ids.map((nodeId, index) => (
              <div key={index}>{gpuNames[nodeId] || 'Unknown GPU'}</div>
            ))
          ) : (
            <div className="flex justify-center items-center text-center">You have no GPUs yet!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GPUContribution;

