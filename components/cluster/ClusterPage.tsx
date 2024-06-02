import ClusterTable from './ClusterTable';
import useSWR from "swr";

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
    ip: '172.17.0.2',
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
    ip: '172.17.0.2',
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
    ip: '172.17.0.2',
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
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const targetUrl = 'http://109.205.183.41:8265/nodes?view=summary';
  // const apiUrl = proxyUrl + encodeURIComponent(targetUrl);
  const apiUrl = proxyUrl + targetUrl;


  const { data, error } = useSWR(apiUrl, { refreshInterval: 1000 });
  console.log(data)
  

  if (error) {
    console.error('Error fetching data:', error);
    return <div>Error loading data</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  // const clusterData = data.nodes.map((node: any) => ({
  //   hostName: node.hostName,
  //   state: node.state,
  //   id: node.id,
  //   ip: node.ip,
  //   cpu: node.cpu,
  //   memory: node.memory,
  //   gpu: node.gpu,
  //   gram: node.gram,
  //   diskRoot: node.diskRoot,
  //   sent: node.sent,
  //   received: node.received,
  //   logicalResources: node.logicalResources,
  // }));
  return (
    <div>
      <ClusterTable data={clusterData} />
    </div>
  );
};

export default ClusterPage;