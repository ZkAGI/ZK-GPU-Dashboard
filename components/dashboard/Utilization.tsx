import React from "react";
import GPUComponent from "./GPUComponent";

const Utilization: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <div>Utilization</div>
      <div className="bg-[#060b28] p-2 rounded-md flex flex-col">
        <div className=" flex flex-col gap-2">
          <GPUComponent />
          <GPUComponent />
        </div>
        <div className=" flex justify-center items-center bg-gradient-to-tr from-[#000D33] via-[#9A9A9A] to-[#000D33] p-0.5 w-fit rounded-lg mx-12 my-6">
            <div className="p-2 rounded-lg bg-[#060b28]">
                <button className="bg-gradient-to-r from-[#A4C8FF] via-[#A992ED] to-[#643ADE] bg-clip-text text-transparent" style={{textShadow: " #A992ED 5px 5px 40px",}}>
                    Connect New GPU
                </button>
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
