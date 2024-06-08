import React, { useEffect, useState } from 'react';
import ClusterTable from './ClusterTable';
import useSWR from 'swr';
import { useClusterStore } from '../../hooks/store/useClusterStore';
import { memoryConverter } from '@/utils/memoryConverter';

interface Gpu {
  name?: string;
  memoryTotal?:string
  memoryUsed?:string
}

interface SummaryItem {
  gpus?: Gpu[];
  hostname?: string;
}

const ClusterPage: React.FC = () => {
  const { data, error } = useSWR('http://65.20.68.31/api/nodes', { refreshInterval: 8000 });
  const { clusters, setClusters } = useClusterStore();

  const summary: SummaryItem[] | undefined = data?.data?.summary;
  const [memoryTotal, setmemoryTotal] = useState<number | undefined>(undefined);
  const [memoryUsed, setmemoryUsed] = useState<number | undefined>(undefined);


// useEffect(() => {
//   let totalMemory = 0;
//   let usedMemory = 0;

//   if (Array.isArray(summary)) {
//     summary.forEach((item) => {
//       if (Array.isArray(item.gpus)) {
//         item.gpus.forEach((gpu) => {
//           if (gpu?.memoryTotal && gpu?.memoryUsed) {
//             totalMemory += Number(gpu.memoryTotal);
//             usedMemory += Number(gpu.memoryUsed);
//           }
//         });
//       }
//     });
//   }

//   setmemoryTotal(totalMemory);
//   setmemoryUsed(usedMemory);
// }, [summary]);

  
  // useEffect(() => {
  //   if (data) {
  //     console.log('Summary data:', data?.data?.summary);
  //     const clusterData = data?.data?.summary.map((node: any) => {
  //       return {
  //         hostName: node?.hostname,
  //         state: node?.raylet.state,
  //         id: node?.raylet.nodeId,
  //         ip: node?.ip,
  //         cpu: node.cpu,
  //         // memory: `${(node.objectStoreUsedMemory / (1024 * 1024)).toFixed(2)}MB/${(node.resourcesTotal.memory / (1024 * 1024)).toFixed(2)}MB`,
  //         // gpu: node.resourcesTotal.GPU || '0',
  //         gram:  `${memoryTotal}/${memoryUsed}` ,
  //         diskRoot: 'N/A', 
  //         sent: 'N/A', 
  //         received: 'N/A', 
  //         // logicalResources: `${node.resourcesTotal.CPU} CPU, ${node.resourcesTotal.GPU} GPU`,
  //       };
  //     });
  //     setClusters(clusterData);
  //   }
  // }, [data, setClusters]);

  useEffect(() => {
    if (data) {
      console.log('Summary data:', data?.data?.summary);
      const clusterData = data?.data?.summary.map((node: any) => {

        let totalMemory = 0;
        let usedMemory = 0;
        let sentGb = '0';
        let receivedGb = '0';
        let id='0';
        let total;
        let percentage;
        let used;
  
        if (Array.isArray(node.gpus)) {
          node.gpus.forEach((gpu: Gpu) => {
            if (gpu?.memoryTotal && gpu?.memoryUsed) {
              totalMemory += Number(gpu.memoryTotal);
              usedMemory += Number(gpu.memoryUsed);
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
          console.log(node.mem)
         }


        return {
          hostName: node?.hostname,
          state: node?.raylet.state,
          id: id,
          ip: node?.ip,
          cpu: `${node.cpu}%`,
          memory: `${used}/${total}(${percentage}%)`,
          //gpu: node.resourcesTotal.GPU || '0',
          gram: `${totalMemory}/${usedMemory}`,
          diskRoot: 'N/a',
          sent: `${sentGb}/s`,
          received: `${receivedGb}/s`,
        };
      });
      setClusters(clusterData);
    }
  }, [data, setClusters]);

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
