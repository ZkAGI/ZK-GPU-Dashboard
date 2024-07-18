import { create } from "zustand";

interface FormState {
    os: 'windows' | 'mac' | 'ubuntu';
    windowsStepIndex: number;
    macStepIndex: number;
    ubuntuStepIndex: number;
    formValues: any;
    deviceName: string;
    setOs:(os: 'windows' | 'mac' | 'ubuntu')=>void
    setFormValues:(values: any)=>void
    setWindowsStepIndex:(index: number)=>void
    setDeviceName: (name: string) => void;
  }
  
  export const useFormStore = create<FormState>((set) => ({
    os: 'windows',
    windowsStepIndex: 0,
    macStepIndex: 0,
    ubuntuStepIndex: 0,
    formValues: {},
    deviceName: 'New-Device',
    setOs: (os: 'windows' | 'mac' | 'ubuntu') =>
      set((state) => ({
        os,
        windowsStepIndex: 0,
        macStepIndex: 0,
        ubuntuStepIndex: 0,
      })),
    setWindowsStepIndex: (index: number) =>
      set((state) => ({ windowsStepIndex: index })),
    setMacStepIndex: (index: number) => set((state) => ({ macStepIndex: index })),
    setUbuntuStepIndex: (index: number) =>
      set((state) => ({ ubuntuStepIndex: index })),
    setFormValues: (values: any) => set((state) => ({ formValues: values })),
    setDeviceName: (name: string) => set((state) => ({ deviceName: name })),
  }));