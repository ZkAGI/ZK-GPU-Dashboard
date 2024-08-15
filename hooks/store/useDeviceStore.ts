import { create } from "zustand";

interface ConnectState {
  deviceType: string;
  serviceType: string;
  publicNodeIP: string;
  formValues: any;
  setDeviceType: (type: string) => void;
  setServiceType: (type: string) => void;
  setFormValues: (values: any) => void;
  setPublicNodeIP: (ip: string) => void;
}

export const useConnectStore = create<ConnectState>((set) => ({
  deviceType: '',
  serviceType: '',
  publicNodeIP: '',
  formValues: {},
  setDeviceType: (type: string) => 
    set((state) => ({ deviceType: type })),
  setServiceType: (type: string) => 
    set((state) => ({ serviceType: type })),
  setPublicNodeIP: (ip: string) => 
    set((state) => ({ publicNodeIP: ip })),
  setFormValues: (values: any) => 
    set((state) => ({ formValues: {...state.formValues, ...values} })),
}));