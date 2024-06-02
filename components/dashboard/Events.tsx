import React, { useEffect } from "react";

import useSWR from 'swr'
 

const Events: React.FC = () => {

// const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
// const targetUrl = 'http://109.205.183.41:8265/events';
// const apiUrl = proxyUrl + targetUrl;

// const { data, error } = useSWR(apiUrl, { refreshInterval: 1000 })
// console.log(data)

// useEffect(() => {
//   const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
//   const targetUrl = 'http://109.205.183.41:8265/nodes?view=summary';

//   fetch(proxyUrl + targetUrl)
//     .then((res) => res.json())
//     .then((data) => {
//       console.log('Fetched data:', data); 
//     })
//     .catch((error) => {
//       console.error('Error fetching data:', error);
//     });
//   }, []);

  

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
