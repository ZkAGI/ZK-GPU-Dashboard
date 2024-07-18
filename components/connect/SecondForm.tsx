import { Field, Form } from "houseform";
import { Radio } from "./Radio";
import { ButtonV2 } from "../buttonV2";
import { useConnectStore } from "@/hooks/store/useDeviceStore";
import { gpuNames } from "@/data/gpuNames";
import { useState, useEffect } from "react";

export function SecondForm({
  title,
  onNext,
}: {
  title: string;
  onNext: () => any;
}) {
  const { deviceType, setDeviceType, serviceType, setServiceType } =
    useConnectStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!serviceType) {
      setServiceType("local");
    }
  }, [serviceType, setServiceType]);

  const filteredGpuNames = gpuNames.filter((name) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Form onSubmit={onNext}>
        {({ submit, isValid }) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              isValid && submit();
            }}
            className="flex flex-col"
          >
            <div>
              <div className="text-lg">2. Device Type</div>
            </div>
            <div className="lg:grid lg:grid-cols-2 lg:gap-20">
              <div>
                <div>
                  <Field name="serviceType" initialValue="local">
                    {({ value, setValue }) => (
                      <div className="mt-1">
                        <div className="text-xs ml-4 text-[#5D7285] w-3/4">
                          Use your local PC for connecting to the CPU/GPU or use
                          an online service like AWS, GCP, Azure, etc
                        </div>
                       <div className="bg-gradient-to-tr from-[#000D33] p-0.5 via-[#9A9A9A] to-[#000D33]  rounded w-fit mb-8 mt-2 ml-4">
                
                        <div className="grid grid-cols-2 rounded  bg-[#060b28] p-2">
                          <div
                            className={`${
                              value === "local"
                                ? "bg-gradient-to-tr from-[#000D33] via-[#9A9A9A] to-[#000D33] p-0.5 rounded text-center shadow-md shadow-[#3c2693]"
                                : null
                            }`}
                          >
                            <div className=" bg-[#060b28] rounded">
                              <button
                                type="button"
                                className={`w-full py-2 rounded uppercase text-xs ${
                                  value === "local"
                                    ? " text-[#77FFCE] bg-[#171D3D]"
                                    : "font-semibold text-[#52566f]"
                                }`}
                                onClick={() => {
                                  setValue("local");
                                  setServiceType("local");
                                }}
                              >
                                Local PC
                              </button>
                            </div>
                          </div>
                          <div
                            className={`${
                              value === "cloud"
                                ? "bg-gradient-to-tr from-[#000D33] via-[#9A9A9A] to-[#000D33] p-0.5 rounded text-center shadow-md shadow-[#3c2693]"
                                : null
                            }`}
                          >
                            <div className="bg-[#060b28] rounded">
                              <button
                                type="button"
                                className={`px-4 py-2 rounded uppercase text-xs ${
                                  value === "cloud"
                                    ? " text-[#77FFCE] bg-[#171D3D]"
                                    : "font-semibold  text-[#52566f]"
                                }`}
                                onClick={() => {
                                  setValue("cloud");
                                  setServiceType("cloud");
                                }}
                              >
                                Cloud Services
                              </button>
                            </div>
                          </div>
             
                        </div>
                       </div>
                      </div>
                    )}
                  </Field>
                  <div className="text-xs text-[#5D7285] ml-4">
                    If you opt for the GPU Worker but your device lacks a GPU,
                    <br /> the setup will not succeed.
                  </div>
                </div>
                <div className="bg-gradient-to-tr from-[#000D33] via-[#9A9A9A] to-[#000D33] p-px m-2 rounded-md lg:w-7/12">
                  <div className="bg-[#060B28] p-4 rounded-md">
                    <Field name="deviceType">
                      {({ value, setValue }) => (
                        <div>
                          <Radio
                            name="deviceType"
                            value="gpu"
                            text="GPU"
                            onChange={(value) => {
                              setValue(value);
                              setDeviceType(value);
                            }}
                            checked={value === "gpu"}
                          />
                          <Radio
                            name="deviceType"
                            value="cpu"
                            text="CPU"
                            onChange={(value) => {
                              setValue(value);
                              setDeviceType(value);
                            }}
                            checked={value === "cpu"}
                          />
                        </div>
                      )}
                    </Field>

                    <div className="flex justify-end mt-4">
                      <ButtonV2>
                        <button>NEXT STEP</button>
                      </ButtonV2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#060B28] w-2/3 rounded-lg p-4 bg-opacity-25 ml-20 mb-4">
                <div>List of supported GPUs/CPUs</div>
                <div className="border p-1 rounded text-slate-400 font-thin pl-10 my-1 w-3/4 text-sm">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-transparent outline-none w-full"
                  />
                </div>
                <div className="max-h-80 overflow-x-hidden">
                  <div className="w-11/12 my-2">
                    {filteredGpuNames.map((name, index) => (
                      <div
                        key={index}
                        className="text-[#5D7285] border-b border-[#5D7285] text-xs py-2"
                      >
                        {name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </Form>
    </div>
  );
}
