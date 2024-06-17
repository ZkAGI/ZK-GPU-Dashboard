import React, { useEffect, useState } from 'react';
import RadialBarChart from '../graphs/RadialBarChart';
import axios from 'axios';
import { useWallet } from '@solana/wallet-adapter-react';
import useSWR from 'swr';

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
  const [gpuNames, setGpuNames] = useState<{ [key: string]: string }>({});

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
          method: 'GET',
         // url: `https://zynapse.zkagi.ai/wallets/${walletAddress}/ip_addresses`,
         url:`https://zynapse.zkagi.ai/wallets/CAPtJBJtTYd9NbtYsTmBRccbUpER4ssvTw8JetT12wbX/ip_addresses`,
          headers: {
            'Content-Type': 'application/json',
            'api-key': 'zk-123321',
          },
        });
        if (response.status === 200) {
          const ipResponse = await axios({
            method: 'GET',
            // url: `https://zynapse.zkagi.ai/ips/${response.data.ip_addresses[0]}/nodes`,
            url:`https://zynapse.zkagi.ai/ips/10.8.0.34/nodes`,
            headers: {
              'Content-Type': 'application/json',
              'api-key': 'zk-123321',
            },
          });
          if (ipResponse.status === 200) {
            const filteredNodeIds = ipResponse.data.node_ids.filter((nodeId: string) => {
              const node = nodesData?.data?.summary.find((node: any) => node.raylet.nodeId === nodeId);
              return node && node.raylet.state !== 'DEAD';
            });
            setList({ node_ids: filteredNodeIds });
            console.log('filtered list', filteredNodeIds);
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
                    url: `https://zynapse.zkagi.ai/nodes/${node.raylet.nodeId}/active-time`,
                    headers: {
                      'Content-Type': 'application/json',
                      'api-key': 'zk-123321',
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
            if (node.ip === selectedIp && node.raylet.state !=='DEAD') {
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
