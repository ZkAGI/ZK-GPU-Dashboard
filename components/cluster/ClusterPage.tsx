import React, { useEffect } from 'react';
import ClusterTable from './ClusterTable';
import useSWR from 'swr';
import { useClusterStore } from '../../hooks/store/useClusterStore';


const ClusterPage: React.FC = () => {
  const { data, error } = useSWR('http://65.20.68.31:5000/api/nodes', { refreshInterval: 8000 });
  const { clusters, setClusters } = useClusterStore();

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
          diskRoot: 'N/A', 
          sent: 'N/A', 
          received: 'N/A', 
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
