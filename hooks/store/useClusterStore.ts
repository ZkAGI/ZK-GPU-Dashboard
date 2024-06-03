import {create} from 'zustand';

interface ClusterData {
  hostName: string;
  state: string;
  id: string;
  ip: string;
  cpu: number;
  memory: string;
  gpu: string | null;
  gram: string;
  diskRoot: string;
  sent: string;
  received: string;
  logicalResources: string;
}

interface ClusterStore {
  clusters: ClusterData[];
  setClusters: (clusters: ClusterData[]) => void;
}

export const useClusterStore = create<ClusterStore>((set) => ({
  clusters: [],
  setClusters: (clusters) => set({ clusters }),
}));
