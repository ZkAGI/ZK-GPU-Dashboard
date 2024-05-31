// import React from "react";


// const Events: React.FC = () => {
//   return (
//     <div className="flex flex-col gap-2">
//       <div>Events</div>
//       <div className="bg-[#060b28] p-2 rounded-md flex flex-col">
        
//       </div>
//     </div>
//   );
// };

// export default Events;

import React, { useEffect } from "react";
import create, { SetState } from "zustand";
import axios from "axios";
import { useEventStore } from "@/hooks/store/useEventsStore";

// interface Event {
//   id: number;
//   title: string;
//   description: string;
// }


// interface EventStore {
//   events: Event[];
//   addEvents: () => Promise<void>;
// }

// const useEventStore = create<EventStore>((set: SetState<EventStore>) => ({
//   events: [],
//   addEvents: async () => {
//     try {
//       const response = await axios.get<Event[]>("http://109.205.183.41:8265/events");
//       console.log(response.data)
//       set({ events: response.data });
//     } catch (error) {
//       console.error("Error fetching events:", error);
//     }
//   },
// }));

const Events: React.FC = () => {
//   const {events, addEvents  } = useEventStore((state) => ({
//     events: state.events,
//     addEvents: state.addEvents,
//   }));

//   useEffect(() => {
//     addEvents(); 
//   }, [addEvents]);

//   async function fetchMembers() {
//     try {
//       const response = await axios({
//         method: "GET",
//         url: "http://109.205.183.41:8265/api/jobs/",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       });
//       console.log(response)
//       const members = response.data;
//       return members;
//     } catch (error) {
//       console.error("Error fetching members:", error);
//       throw error;
//     }
//   }
//   fetchMembers()

useEffect(() => {
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const targetUrl = 'http://109.205.183.41:8265/api/jobs/';

  fetch(proxyUrl + targetUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log('Fetched data:', data); // Log the fetched data
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div>Events</div>
      {/* <div className="bg-[#060b28] p-2 rounded-md flex flex-col">
        {events.map((event: Event, index: number) => (
          <div key={index} className="text-white">
            <p>{event.title}</p>
            <p>{event.description}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Events;
