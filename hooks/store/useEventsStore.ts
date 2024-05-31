// import {create} from 'zustand';

// interface Event {
//     msg:string
// }

// interface EventStoreProps {
//     events: Event[];
//     addEvents: (Events: Event[]) => void;
// }

// export const useEventStore = create<EventStoreProps>((set:any) => ({
//     events: [],
//     addEvents: async () => {
//         try {
//             const response = await fetch("http://109.205.183.41:8265/events");
//             const data = await response.json();
//             console.log(data)
//             set({ events: data });
//         } catch (error) {
//             console.error("Error fetching events:", error);
//         }
//     }
// }));

import { create } from 'zustand';

interface CustomFields {
  jobId: string;
  nodeId: string;
  workerId?: string;
}

interface Event {
  customFields: CustomFields;
  eventId: string;
  hostName: string;
  label: string;
  message: string;
  pid: string;
  severity: string;
  sourceType: string;
  timestamp: number;
}

interface EventStoreProps {
  events: Event[];
  addEvents: () => void;
}

export const useEventStore = create<EventStoreProps>((set) => ({
  events: [],
  addEvents: async () => {
    try {
      const response = await fetch("s");
      console.log(response)
      const data = await response.json();
      console.log(data)

      // Type the nested events data
      const nestedEvents: Record<string, Event[]> = data.data.events;

      // Flatten the nested events structure and cast to Event[]
      const eventsArray: Event[] = Object.values(nestedEvents).flat() as Event[];

      set({ events: eventsArray });
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  },
}));
