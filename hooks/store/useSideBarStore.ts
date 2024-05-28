import { create } from 'zustand'

interface SideBarProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    getIsOpen: (isMobile: boolean) => boolean
}

export const useSideBarNavStore = create<SideBarProps>((set, get) => ({
  isOpen : false,
  setIsOpen: (open: boolean) => set(() => ({isOpen:open})),
  getIsOpen: (isMobile: boolean) => {
    if(isMobile) {
        return get().isOpen
    }else{
        return true;
    }
  }
}))