import ClusterTable from './ClusterTable';

const clusterData = [
  {
    hostName: '058ff609e1b9',
    state: 'Alive',
    id: '54b55a',
    ip: '172.17.0.2 (Head)',
    cpu: 25.1,
    memory: '990.38MB/2348MB(1%)',
    gpu: '2',
    gram: '0.00%',
    diskRoot: '0.00%',
    sent: '5.15KB/s',
    received: '5.15KB/s',
    logicalResources: '0/0/100 CPU 0/0/0',
  },
  {
    hostName: '058ff609e1b9',
    state: 'Alive',
    id: '54b55a',
    ip: '172.17.0.2 (Head)',
    cpu: 25.1,
    memory: '990.38MB/2348MB(1%)',
    gpu: '8',
    gram: '0.00%',
    diskRoot: '0.00%',
    sent: '5.15KB/s',
    received: '5.15KB/s',
    logicalResources: '0/0/100 CPU 0/0/0',
  },
  {
    hostName: '058ff609e1b9',
    state: 'Alive',
    id: '54b55a',
    ip: '172.17.0.2 (Head)',
    cpu: 25.1,
    memory: '990.38MB/2348MB(1%)',
    gpu: '7',
    gram: '0.00%',
    diskRoot: '0.00%',
    sent: '5.15KB/s',
    received: '5.15KB/s',
    logicalResources: '0/0/100 CPU 0/0/0',
  },
  {
    hostName: '058ff609e1b9',
    state: 'Alive',
    id: '54b55a',
    ip: '172.17.0.2 (Head)',
    cpu: 25.1,
    memory: '990.38MB/2348MB(1%)',
    gpu: '6',
    gram: '0.00%',
    diskRoot: '0.00%',
    sent: '5.15KB/s',
    received: '5.15KB/s',
    logicalResources: '0/0/100 CPU 0/0/0',
  },
];

const ClusterPage = () => {
  return (
    <div>
      <ClusterTable data={clusterData} />
    </div>
  );
};

export default ClusterPage;