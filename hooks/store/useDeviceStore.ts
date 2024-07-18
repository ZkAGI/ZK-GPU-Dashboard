import { create } from "zustand";

interface ConnectState {
  deviceType: string;
  serviceType: string;
  formValues: any;
  setDeviceType: (type: string) => void;
  setServiceType: (type: string) => void;
  setFormValues: (values: any) => void;
}

export const useConnectStore = create<ConnectState>((set) => ({
  deviceType: '',
  serviceType: '',
  formValues: {},
  setDeviceType: (type: string) => 
    set((state) => ({ deviceType: type })),
  setServiceType: (type: string) => 
    set((state) => ({ serviceType: type })),
  setFormValues: (values: any) => 
    set((state) => ({ formValues: {...state.formValues, ...values} })),
}));