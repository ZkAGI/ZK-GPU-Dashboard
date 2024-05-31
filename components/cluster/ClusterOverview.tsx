import React from 'react';
import NodeStats from './NodeStats';
import ClusterPage from './ClusterPage';


const ClusterOverview: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 text-white">
      <div>Node Statistics</div>
      <NodeStats/>
      <div>Cluster</div>
      <div className="bg-[#060b28] p-2 rounded-md">
        <ClusterPage/>
      </div>
    </div>
  );
}

export default ClusterOverview;
