import React, { useEffect, useState } from 'react';
import RadialBarChart from '../graphs/RadialBarChart';
import axios from 'axios';
import { useWallet } from '@solana/wallet-adapter-react';
import useSWR from 'swr';

interface Node {
  node_ids: string[];
}

interface IpNodesMap {
  [key: string]: string[];
}

interface NodeGpuMap {
  [key: string]: GpuInfo;
}

interface GpuInfo {
  names: string[];
  totalMemory: number;
}


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const KEY = process.env.API_KEY;

const GPUContribution: React.FC = () => {
  const { wallet } = useWallet();
  const walletAddress = wallet?.adapter?.publicKey?.toString();
  const [ipNodesMap, setIpNodesMap] = useState<IpNodesMap>({});
  const [totalNodeIds, setTotalNodeIds] = useState<string[]>([]);
  const { data: nodesData, error: nodesError } = useSWR(`${BASE_URL}/api/nodes`, { refreshInterval: 1000 });
  const { data: gpuData, error: gpuError } = useSWR(`${BASE_URL}/api/dailystats`, { refreshInterval: 8000 });
  const [aliveCount, setAliveCount] = useState(0);
  const [gpuCount, setGpuCount] = useState(0);
  const [gpuNames, setGpuNames] = useState<{ [key: string]: string }>({});
  const [nodeGpuMap, setNodeGpuMap] = useState<NodeGpuMap>({});

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
          const ipAddresses = response.data.ip_addresses;
          const newIpNodesMap: IpNodesMap = {};
          let allNodeIds: string[] = [];

          // Fetch nodes for each IP address
          await Promise.all(ipAddresses.map(async (ipAddress: string) => {
            try {
              const ipResponse = await axios({
                method: 'GET',
                url: `${BASE_URL}/ips/${ipAddress}/nodes`,
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
                newIpNodesMap[ipAddress] = filteredNodeIds;
                allNodeIds = [...allNodeIds, ...filteredNodeIds];
              }
            } catch (error) {
              console.error(`Error fetching nodes for IP ${ipAddress}:`, error);
            }
          }));

          setIpNodesMap(newIpNodesMap);
          setTotalNodeIds(allNodeIds);
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
    if (nodesData && Object.keys(ipNodesMap).length > 0) {
      const clusterData = nodesData?.data?.summary;
      if (clusterData) {
        const fetchGpuNames = async () => {
          let totalMemory = 0;
          const newNodeGpuMap: NodeGpuMap = {};

          await Promise.all(
            Object.entries(ipNodesMap).flatMap(([ip, nodeIds]) =>
              nodeIds.map(async (nodeId) => {
                const node = clusterData.find((n: any) => n.raylet.nodeId === nodeId);
                if (node && node.raylet.state !== 'DEAD') {
                  try {
                    const response = await axios({
                      method: 'GET',
                      url: `${BASE_URL}/nodes/${nodeId}/active-time`,
                      headers: {
                        'Content-Type': 'application/json',
                        'api-key': `${KEY}`,
                      },
                    });
                    if (response.status === 200) {
                      const gpuNames = node.gpus?.map((gpu: any) => gpu.name || 'Unknown GPU') || ['Unknown GPU'];
                      const nodeMemory = Array.isArray(node.gpus)
                        ? node.gpus.reduce((gpuTotal: number, gpu: any) =>
                          gpuTotal + (gpu?.memoryTotal ? Number(gpu.memoryTotal) / 1024 : 0), 0)
                        : 0;

                      newNodeGpuMap[nodeId] = {
                        names: gpuNames,
                        totalMemory: nodeMemory
                      };
                      totalMemory += nodeMemory;
                    }
                  } catch (error) {
                    console.error('Error fetching GPU names', error);
                  }
                }
              })
            )
          );

          setNodeGpuMap(newNodeGpuMap);
          setGpuCount(totalMemory);
        };

        fetchGpuNames();
      }
    }
  }, [nodesData, ipNodesMap]);

  return (
    <div>
      <div>GPU Contribution</div>
      <div className="bg-[#060b28] flex flex-col justify-center p-2 rounded-lg">
        <div className="h-48 flex justify-center items-center">
          <RadialBarChart aliveCount={aliveCount} gpuCount={gpuCount} />
        </div>
        <div className="w-full p-4 text-xs rounded-xl bg-[#171D3D] mb-0.5">
          {Object.values(nodeGpuMap).flatMap(node => node.names).length > 0 ? (
            <div>
              {Object.values(nodeGpuMap).flatMap(node =>
                node.names.map((gpuName, index) => (
                  <div key={index} className="mb-1">
                    • {gpuName}
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="flex justify-center items-center text-center">You have no GPUs yet!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GPUContribution;
