"use client";

import { SecondForm } from "./SecondForm";
import { ThirdForm } from "./ThirdForm";
import { Radio } from "./Radio";
import { useEffect, useState } from "react";
import { ButtonV2 } from "../buttonV2";
import React from "react";
import { PiLessThanLight } from "react-icons/pi";

const forms = {
  win32: [
    (onNext: () => any) => <SecondForm title="Windows" onNext={onNext} />,
    (onNext: () => any) => <ThirdForm onNext={onNext} />,
  ],
  darwin: [(onNext: () => any) => <ThirdForm onNext={onNext} />],
  linux: [
    (onNext: () => any) => <SecondForm title="Ubuntu" onNext={onNext} />,
    (onNext: () => any) => <ThirdForm onNext={onNext} />,
  ],
};

type OS = keyof typeof forms;

const descriptions = {
  darwin: ["Operating System", "Script File"],
  win32: ["Operating System", "Device Type", "Script File"],
  linux: ["Operating System", "Device Type", "Script File"],
};

function RenderSequentially({
  forms,
  os,
  showForms,
  index,
  setIndex,
  setShowForms
}: {
  forms: ((onNext: () => any) => JSX.Element)[];
  os: OS;
  showForms: boolean;
  index:number;
  setIndex:React.Dispatch<React.SetStateAction<number>>,
  setShowForms: React.Dispatch<React.SetStateAction<boolean>>
}) {

  const onNext = () => setIndex((existing) => existing + 1);
  const onPrev = () => {
    setIndex((existing) => existing - 1)
    if(index == 1){
      setShowForms(false)
    }
  };
  const description = descriptions[os];

  return (
    <div className="">
      <div className="flex items-center justify-center space-x-4 mb-4 mx-60">
        {description.map((step, i) => (
          <React.Fragment key={i}>
            <div
              className={`flex flex-col items-center ${
                i <= index ? "text-[#01B574]" : "text-[#5A49AC] font-light"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                  i <= index
                    ? "bg-[#01B574]"
                    : "bg-[#5A49AC] text-[#010921] font-light"
                }`}
              >
                {i + 1}
              </div>
              <span className="text-xs mt-1 text-center">{step}</span>
            </div>
            {i < description.length - 1 && (
              <div
                className={`flex-grow h-0.5 ${
                  i < index ? "bg-[#01B574]" : "bg-[#5A49AC]"
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
      {showForms && <button type="button" onClick={onPrev} className="text-[#5D7285] text-xs flex justify-center items-center gap-1 ml-4"> <span className="text-white"><PiLessThanLight /></span> Back one step</button>}
      {showForms && forms[index-1] && forms[index-1](onNext)}
    </div>
  );
}

export function ConnectOverview() {
  const [os, setOs] = useState<OS>("win32");
  const [showForms, setShowForms] = useState(false);
  const [index, setIndex] = useState(0);

  const onNext = () => {
    setShowForms(true)
    setIndex(exi => exi+1)
  }

  return (
    <>
      <RenderSequentially forms={forms[os]} os={os} showForms={showForms} index={index} setIndex={setIndex} setShowForms={setShowForms}/>
      {!showForms && (
        <div className="mb-20 p-2">
          <div>
            <div className="text-lg">1. Operating System</div>
            <div className="text-xs text-[#5D7285] ml-4">Choose Operating System "OS"</div>
          </div>
          <div className="bg-gradient-to-tr from-[#000D33] via-[#9A9A9A] to-[#000D33] p-px my-4 rounded-md md:w-1/4">
          <div className="bg-[#060B28] p-4 rounded-md">
            <div>
              <Radio
                name="os"
                value="win32"
                text="Windows"
                onChange={(value) => setOs(value as any)}
                checked={os == "win32"}
              />
              <Radio
                name="os"
                value="darwin"
                text="macOS"
                onChange={(value) => setOs(value as any)}
                checked={os == "darwin"}
              />
              <Radio
                name="os"
                value="linux"
                text="Ubuntu"
                onChange={(value) => setOs(value as any)}
                checked={os == "linux"}
              />
            </div>
            <div className="flex justify-end">
              <ButtonV2>
                <button type="button" onClick={onNext}>
                  NEXT STEP
                </button>
              </ButtonV2>
            </div>
          </div>
        </div>
        </div>
      )}
    </>
  );

}
