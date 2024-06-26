import React, { useEffect, useState } from 'react';
import ClusterTable from './ClusterTable';
import useSWR from 'swr';
import { useClusterStore } from '../../hooks/store/useClusterStore';
import { memoryConverter } from '@/utils/memoryConverter';
import axios from 'axios';

interface Gpu {
  name?: string;
  memoryTotal?:string
  memoryUsed?:string
  utilizationGpu?:string
}

interface SummaryItem {
  gpus?: Gpu[];
  hostname?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const KEY = process.env.API_KEY;

const ClusterPage: React.FC = () => {
  const { data, error } = useSWR(`${BASE_URL}/api/nodes`, { refreshInterval: 1000 });
  const { clusters, setClusters } = useClusterStore();

  const summary: SummaryItem[] | undefined = data?.data?.summary;
  const [memoryTotal, setmemoryTotal] = useState<number | undefined>(0);
  const [memoryUsed, setmemoryUsed] = useState<number | undefined>(0);
  const [formattedData, setFormattedData] = useState<any>([]);
  const [start, setStart] = useState<any>(null);

  useEffect(() => {
    if (data) {
      const clusterData = data?.data?.summary.map( (node: any) => {

        let totalMemory = 0;
        let usedMemory = 0;
        let sentGb = '0';
        let receivedGb = '0';
        let id='0';
        let total;
        let percentage;
        let used;
        let diskUsed;
        let diskTotal;
        let diskPercentage;
        let gpuPercent;
        let cpu;
        let resourceMemory;
        let object;
  
        if (Array.isArray(node.gpus)) {
          node.gpus.forEach((gpu: Gpu) => {
            if (gpu?.memoryTotal && gpu?.memoryUsed) {
              totalMemory += Number(gpu.memoryTotal);
              usedMemory += Number(gpu.memoryUsed);
              gpuPercent = gpu.utilizationGpu
            }
          });
        }
        setmemoryTotal(totalMemory);
        setmemoryUsed(usedMemory);

        if (Array.isArray(node.networkSpeed)) {
          sentGb = memoryConverter(node.networkSpeed[0])
          receivedGb = memoryConverter(node.networkSpeed[1])
        }

        if(node?.raylet.nodeId){
          id = node?.raylet.nodeId.slice(0, 5) + '...'
        }

        if (Array.isArray(node.mem)) {
          total = memoryConverter(node.mem[1])
          percentage = node.mem[2].toFixed(2)
          used = memoryConverter(node.mem[3])
         }

         if (node.disk) {
          const rootDisk = node.disk['/'];
          diskUsed=memoryConverter(rootDisk.used)
          diskTotal=memoryConverter(rootDisk.total)
          diskPercentage=rootDisk.percent
         }

         if (node?.raylet.resourcesTotal) {
          cpu = node.raylet.resourcesTotal.CPU
          resourceMemory = memoryConverter(node.raylet.resourcesTotal.memory)
          object = memoryConverter(node.raylet.resourcesTotal.object_store_memory)
         }

        if (node?.raylet.state === 'DEAD' && node?.raylet?.endTimeMs) {
          const date = new Date(Number(node?.raylet?.endTimeMs));
          const formattedData = date.toISOString();
          sendEndTime(node?.raylet.nodeId, formattedData);
        }

        return {
          hostName: node?.hostname,
          state: node?.raylet.state,
          id: id,
          ip: node?.ip,
          cpu: `${node.cpu}%`,
          memory: `${used}/${total}(${percentage}%)`,
          gpu: `${gpuPercent}%`,
          gram: `${usedMemory}/${totalMemory}`,
          diskRoot: `${diskUsed}/${diskTotal}(${diskPercentage}%)`,
          sent: `${sentGb}/s`,
          received: `${receivedGb}/s`,
          logicalResources: `${cpu} CPU, ${resourceMemory} memory, ${object} object_store_memory`,
        };
      });
      setClusters(clusterData);
    }
  }, [data, setClusters]);

  const sendEndTime = async (nodeId: string, endTime: string) => {
    try {
      const postResponse = await axios({
        method: "PUT",
        url: `${BASE_URL}/nodes/${nodeId}/end-time`,
        data: {
          "end_time": endTime
        },
        headers: {
          "Content-Type": "application/json",
          //"api-key": "zk-123321",
          "api-key": `${KEY}`
        },
      });
      if (postResponse.status !== 200) {
        console.log('Error in end time');
      }
    } catch (error) {
      console.error('Error while performing PUT request:', error);
    }
  };

  if (error) {
    console.error('Error fetching data:', error);
    return <div>Error loading data</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ClusterTable data={clusters} />
    </div>
  );
};

export default ClusterPage;
