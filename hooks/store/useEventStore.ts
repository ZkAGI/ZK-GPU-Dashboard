import {create} from 'zustand';

interface EventsStore {
  events: any[];
  setEvents: (events: any[]) => void;
}

export const useEventsStore = create<EventsStore>((set) => ({
  events: [],
  setEvents: (events) => set({ events }),
}));