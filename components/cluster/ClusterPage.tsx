// import ClusterTable from './ClusterTable';
// import useSWR from "swr";

// const clusterData = [
//   {
//     hostName: '058ff609e1b9',
//     state: 'Alive',
//     id: '54b55a',
//     ip: '172.17.0.2 (Head)',
//     cpu: 25.1,
//     memory: '990.38MB/2348MB(1%)',
//     gpu: '2',
//     gram: '0.00%',
//     diskRoot: '0.00%',
//     sent: '5.15KB/s',
//     received: '5.15KB/s',
//     logicalResources: '0/0/100 CPU 0/0/0',
//   },
//   {
//     hostName: '058ff609e1b9',
//     state: 'Alive',
//     id: '54b55a',
//     ip: '172.17.0.2',
//     cpu: 25.1,
//     memory: '990.38MB/2348MB(1%)',
//     gpu: '8',
//     gram: '0.00%',
//     diskRoot: '0.00%',
//     sent: '5.15KB/s',
//     received: '5.15KB/s',
//     logicalResources: '0/0/100 CPU 0/0/0',
//   },
//   {
//     hostName: '058ff609e1b9',
//     state: 'Alive',
//     id: '54b55a',
//     ip: '172.17.0.2',
//     cpu: 25.1,
//     memory: '990.38MB/2348MB(1%)',
//     gpu: '7',
//     gram: '0.00%',
//     diskRoot: '0.00%',
//     sent: '5.15KB/s',
//     received: '5.15KB/s',
//     logicalResources: '0/0/100 CPU 0/0/0',
//   },
//   {
//     hostName: '058ff609e1b9',
//     state: 'Alive',
//     id: '54b55a',
//     ip: '172.17.0.2',
//     cpu: 25.1,
//     memory: '990.38MB/2348MB(1%)',
//     gpu: '6',
//     gram: '0.00%',
//     diskRoot: '0.00%',
//     sent: '5.15KB/s',
//     received: '5.15KB/s',
//     logicalResources: '0/0/100 CPU 0/0/0',
//   },
// ];

// const ClusterPage = () => {
//   const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
//   const targetUrl = 'http://109.205.183.41:8265/nodes?view=summary';
//   // const apiUrl = proxyUrl + encodeURIComponent(targetUrl);
//   const apiUrl = proxyUrl + targetUrl;


//   const { data, error } = useSWR('http://109.205.183.41:3000/api/nodes', { refreshInterval: 8000 });
//   console.log(data.data?.summary)
  

//   if (error) {
//     console.error('Error fetching data:', error);
//     return <div>Error loading data</div>;
//   }

//   if (!data) {
//     return <div>Loading...</div>;
//   }

//   // const clusterData = data.data.data?.summary.map((node: any) => ({
//   //   hostName: node.hostName,
//   //   state: node.state,
//   //   id: node.id,
//   //   ip: node.ip,
//   //   cpu: node.cpu,
//   //   memory: node.memory,
//   //   gpu: node.gpu,
//   //   gram: node.gram,
//   //   diskRoot: node.diskRoot,
//   //   sent: node.sent,
//   //   received: node.received,
//   //   logicalResources: node.logicalResources,
//   // }));
//   return (
//     <div>
//       <ClusterTable data={clusterData} />
//     </div>
//   );
// };

// export default ClusterPage;


import React, { useEffect } from 'react';
import ClusterTable from './ClusterTable';
import useSWR from 'swr';
import { useClusterStore } from '../../hooks/store/useClusterStore';

// const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
// const targetUrl = 'http://109.205.183.41:8265/nodes?view=summary';
// const apiUrl = proxyUrl + targetUrl;

const ClusterPage: React.FC = () => {
  const { data, error } = useSWR('http://109.205.183.41:3000/api/nodes', { refreshInterval: 8000 });
  const { clusters, setClusters } = useClusterStore();

  // useEffect(() => {
  //   if (data) {
  //     console.log(data?.data?.summary);
  //     const clusterData = data?.data?.summary.map((node: any) => ({
  //       hostName: node.nodeManagerHostname || 'Unknown',
  //       state: node.state,
  //       id: node.nodeId,
  //       ip: node.nodeManagerAddress,
  //       // cpu: node.resourcesTotal.CPU || 0,
  //       // memory: `${(node.objectStoreUsedMemory / (1024 * 1024)).toFixed(2)}MB/${(node.resourcesTotal.memory / (1024 * 1024)).toFixed(2)}MB`,
  //       // gpu: node.resourcesTotal.GPU || '0',
  //       // gram: `${(node.objectStoreUsedMemory / node.resourcesTotal.object_store_memory * 100).toFixed(2)}%`,
  //       diskRoot: 'N/A', // Update as per actual data if available
  //       sent: 'N/A', // Update as per actual data if available
  //       received: 'N/A', // Update as per actual data if available
  //       // logicalResources: `${node.resourcesTotal.CPU} CPU, ${node.resourcesTotal.GPU} GPU`,
  //     }));
  //     setClusters(clusterData);
  //   }
  // }, [data, setClusters]);
  useEffect(() => {
    if (data) {
      console.log('Summary data:', data?.data?.summary);
      const clusterData = data?.data?.summary.map((node: any) => {
        console.log('Node:', node?.ip);
        return {
          hostName: node?.hostname,
          state: node?.raylet.state,
          id: node?.raylet.nodeId,
          ip: node?.ip,
          cpu: node.cpu,
          // memory: `${(node.objectStoreUsedMemory / (1024 * 1024)).toFixed(2)}MB/${(node.resourcesTotal.memory / (1024 * 1024)).toFixed(2)}MB`,
          // gpu: node.resourcesTotal.GPU || '0',
          // gram: `${(node.objectStoreUsedMemory / node.resourcesTotal.object_store_memory * 100).toFixed(2)}%`,
          diskRoot: 'N/A', // Update as per actual data if available
          sent: 'N/A', // Update as per actual data if available
          received: 'N/A', // Update as per actual data if available
          // logicalResources: `${node.resourcesTotal.CPU} CPU, ${node.resourcesTotal.GPU} GPU`,
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
