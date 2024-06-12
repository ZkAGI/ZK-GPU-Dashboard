import {create} from 'zustand';

interface ConnectStore {
  deviceType: string;
  setDeviceType: (deviceType: string) => void;
}

export const useConnectStore = create<ConnectStore>((set) => ({
  deviceType: 'gpu', 
  setDeviceType: (deviceType: string) => set({ deviceType }),
}));