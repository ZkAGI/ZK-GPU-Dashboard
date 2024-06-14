import React,{useState,useEffect} from "react";
import GPUComponent from "./GPUComponent";
import Link from "next/link";
import useSWR from "swr";

const Utilization: React.FC = () => {

  return (
    <div className="flex flex-col gap-2">
      <div>Utilization</div>
      <div className="bg-[#060b28] p-2 rounded-md flex flex-col">
        <div className=" flex flex-col gap-2 h-36">
          <GPUComponent />
          <GPUComponent />
        </div>
        <div className=" flex justify-center items-center bg-gradient-to-tr from-[#000D33] via-[#9A9A9A] to-[#000D33] p-0.5 w-fit rounded-lg mx-12 my-6">
            <div className="p-2 rounded-lg bg-[#060b28]">
                <Link href="/connect">
                  <button className="cursor-pointer bg-gradient-to-r from-[#A4C8FF] via-[#A992ED] to-[#643ADE] bg-clip-text text-transparent" style={{textShadow: " #A992ED 5px 5px 40px",}}>
                      Connect New GPU
                  </button>
                </Link>
            </div>
        </div>
        <div className=" grid grid-cols-2 justify-between px-5">
            <div>
                <div className="text-3xl text-[#05997C]">125<span className="text-xs text-[#A0AEC0]"> xp</span></div>
                <div className="text-[10px] text-[#A0AEC0]">TODAYS EARNINGS</div>
            </div>
            <div>
                <div className="text-3xl text-[#05997C]">125<span className="text-xs text-[#A0AEC0]"> xp</span></div>
                <div className="text-[10px] text-[#A0AEC0]">TODAYS EARNINGS</div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Utilization;


// import React, { useState, useEffect } from "react";
// import GPUComponent from "./GPUComponent";
// import Link from "next/link";
// import useSWR from 'swr';

// interface Gpu {
//   name?: string;
//   memoryTotal?: string;
//   memoryUsed?: string;
//   utilizationGpu?: string;
// }

// interface Raylet {
//   state?: string;
// }

// interface SummaryItem {
//   gpus?: Gpu[];
//   hostname?: string;
//   raylet?: Raylet[];
// }

// const Utilization: React.FC = () => {
//   const { data, error } = useSWR('https://zynapse.zkagi.ai/api/nodes', { refreshInterval: 1000 });
//   const [gpuNames, setGpuNames] = useState<string[]>([]);

//   useEffect(() => {
//     const summary: SummaryItem[] | undefined = data?.data?.summary;
//     const gpuNamesArray: string[] = [];

//     if (Array.isArray(summary)) {
//       summary.forEach((item) => {
//         if (item.raylet && item.raylet.state !=='DEAD' ) {
//           console.log(item)
//           if (Array.isArray(item.gpus)) {
//             item.gpus.forEach((gpu) => {
//               if (gpu?.name) {
//                 gpuNamesArray.push(gpu.name);
//               }
//             });
//           }
//         }
//       });
//     } else {
//       console.log("Summary is not an array or is undefined.");
//     }

//     setGpuNames(gpuNamesArray);
//   }, [data]);

//   console.log(gpuNames)

//   return (
//     <div className="flex flex-col gap-2">
//       <div>Utilization</div>
//       <div className="bg-[#060b28] p-2 rounded-md flex flex-col">
//         <div className=" flex flex-col gap-2 h-36">
//           {gpuNames.map((name, index) => (
//             <GPUComponent key={index} name={name} />
//           ))}
//         </div>
//         <div className=" flex justify-center items-center bg-gradient-to-tr from-[#000D33] via-[#9A9A9A] to-[#000D33] p-0.5 w-fit rounded-lg mx-12 my-6">
//           <div className="p-2 rounded-lg bg-[#060b28]">
//             <Link href="/connect">
//               <button className="cursor-pointer bg-gradient-to-r from-[#A4C8FF] via-[#A992ED] to-[#643ADE] bg-clip-text text-transparent" style={{ textShadow: " #A992ED 5px 5px 40px" }}>
//                 Connect New GPU
//               </button>
//             </Link>
//           </div>
//         </div>
//         <div className=" grid grid-cols-2 justify-between px-5">
//           <div>
//             <div className="text-3xl text-[#05997C]">125<span className="text-xs text-[#A0AEC0]"> xp</span></div>
//             <div className="text-[10px] text-[#A0AEC0]">TODAYS EARNINGS</div>
//           </div>
//           <div>
//             <div className="text-3xl text-[#05997C]">125<span className="text-xs text-[#A0AEC0]"> xp</span></div>
//             <div className="text-[10px] text-[#A0AEC0]">TODAYS EARNINGS</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Utilization;