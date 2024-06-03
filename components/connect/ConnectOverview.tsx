"use client";

import { Field, Form } from "houseform";
import { SecondForm } from "./SecondForm";
import { ThirdForm } from "./ThirdForm";
import { Radio } from "./Radio";
import { useEffect, useState } from "react";
import { ButtonV2 } from "../buttonV2";
import React from "react";

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
}: {
  forms: ((onNext: () => any) => JSX.Element)[];
  os: OS;
  showForms: boolean;
}) {
  const [index, setIndex] = useState(0);

  const onNext = () => setIndex((existing) => existing + 1);
  const onPrev = () => setIndex((existing) => existing - 1);
  const description = descriptions[os];

  console.log(index, forms[index]);

  return (
    // <>
    //   <pre>{JSON.stringify(description)}</pre>
    //   <pre>{index}</pre>
    //   {showForms && forms[index] && forms[index](onNext)}
    // </>
    <div className="">
      <div className="flex items-center justify-center space-x-4 mb-6 mx-60">
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
      {showForms && forms[index] && forms[index](onNext)}
    </div>
  );
}

export function ConnectOverview() {
  const [os, setOs] = useState<OS>("win32");
  const [showForms, setShowForms] = useState(false);

  return (
    <>
      <RenderSequentially forms={forms[os]} os={os} showForms={showForms} />
      {!showForms && (
        <div className="bg-gradient-to-tr from-[#000D33] via-[#9A9A9A] to-[#000D33] p-px my-4 rounded-md w-1/4">
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
                <button type="button" onClick={() => setShowForms(true)}>
                  NEXT STEP
                </button>
              </ButtonV2>
            </div>
          </div>
        </div>
      )}
    </>
  );

  //   return (
  //     <>
  //       <Form onSubmit={handleSubmit}>
  //         {({ submit, isValid, value: formValue }) => (
  //           <form
  //             onSubmit={(e) => {
  //               e.preventDefault();
  //               isValid && submit();
  //             }}
  //             className="flex flex-col"
  //           >
  //             <RenderSequentially forms={formComponents} os={formValue.os|| 'darwin'}  />
  //             {formComponents.length==0 && <div className="bg-gradient-to-tr from-[#000D33] via-[#9A9A9A] to-[#000D33] p-px my-4 rounded-md w-1/4">
  //                 <div className="bg-[#060B28] p-4 rounded-md">
  //                 <Field name="os" initialValue='darwin'>
  //                             {({ value, setValue }) => (
  //                               <div>
  //                                 <Radio
  //                                   name="os"
  //                                   value="darwin"
  //                                   text="macOS"
  //                                   onChange={(value) => setValue(value)}
  //                                   checked={value == "darwin"}
  //                                 />
  //                                 <Radio
  //                                   name="os"
  //                                   value="win32"
  //                                   text="Windows"
  //                                   onChange={(value) => setValue(value)}
  //                                   checked={value == "win32"}
  //                                 />
  //                                 <Radio
  //                                   name="os"
  //                                   value="linux"
  //                                   text="Ubuntu"
  //                                   onChange={(value) => setValue(value)}
  //                                   checked={value == "linux"}
  //                                 />
  //                               </div>
  //                             )}
  //                           </Field>
  //                           <div className="flex justify-end">
  //                             <ButtonV2>
  //                               <button>NEXT STEP</button>
  //                             </ButtonV2>
  //                           </div>
  //                 </div>
  //               </div>
  //             }
  //           </form>
  //         )}
  //       </Form>
  //     </>
  //   );
}
