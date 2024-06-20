import React, { useState, useEffect } from "react";
import GPUComponent from "./GPUComponent";
import Link from "next/link";
import useSWR from "swr";
import axios from "axios";

interface NodeActiveTimeData {
  active_time: string;
  node_id: string;
  status: string;
}

interface Gpu {
  name: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const KEY = process.env.API_KEY;

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const Utilization: React.FC = () => {
  const { data, error } = useSWR(`${BASE_URL}/api/nodes`, fetcher, { refreshInterval: 1000 });
  const [clustrData, setClustrData] = useState<NodeActiveTimeData[]>([]);
  const [gpuNames, setGpuNames] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (data) {
      const fetchActiveTime = async () => {
        const nodeActiveTimeData: NodeActiveTimeData[] = await Promise.all(
          data?.data?.summary.map(async (node: any) => {
            try {
              const response = await axios({
                method: "GET",
                url: `${BASE_URL}/nodes/${node?.raylet.nodeId}/active-time`,
                headers: {
                  "Content-Type": "application/json",
                  "api-key": `${KEY}`
                },
              });
              if (response.status === 200) {
                const gpuName = node.gpus?.[0]?.name || "Dead GPU";
                setGpuNames(prevNames => ({ ...prevNames, [node.raylet.nodeId]: gpuName }));
                return mapResponseToNodeActiveTimeData(response.data);
              } else {
                console.log('Error fetching node active time', response);
              }
            } catch (error) {
              console.error('Error fetching status', error);
            }
          })
        );
        setClustrData(nodeActiveTimeData.filter(Boolean));
      };
      fetchActiveTime();
    }
  }, [data]);

  const mapResponseToNodeActiveTimeData = (responseData: any): NodeActiveTimeData => {
    return {
      active_time: responseData.active_time,
      node_id: responseData.node_id,
      status: responseData.status,
    };
  };

  const connectedNodes = clustrData.filter(node => node.status === 'connected');
  const disconnectedNodes = clustrData.filter(node => node.status === 'disconnected');
  const sortedNodes = [...connectedNodes, ...disconnectedNodes];

  return (
    <div className="flex flex-col gap-2">
      <div>Utilization</div>
      <div className="bg-[#060b28] p-2 rounded-md flex flex-col justify-center itens-center">
        <div className="flex flex-col gap-2 h-48 overflow-y-scroll">
          {sortedNodes.map((node, index) => (
            <GPUComponent key={index} nodeData={node} gpuName={gpuNames[node.node_id]} />
          ))}
        </div>
        <div className="flex justify-center items-center bg-gradient-to-tr from-[#000D33] via-[#9A9A9A] to-[#000D33] p-0.5 w-fit rounded-lg mx-12 my-6">
          <div className="p-2 rounded-lg bg-[#060b28]">
            <Link href="/connect">
              <button
                className="cursor-pointer bg-gradient-to-r from-[#A4C8FF] via-[#A992ED] to-[#643ADE] bg-clip-text text-transparent min-w-40"
                style={{ textShadow: "#A992ED 5px 5px 40px" }}
              >
                Connect New GPU
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Utilization;
