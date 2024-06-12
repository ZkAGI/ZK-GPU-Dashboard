import { Field, Form } from "houseform";
import { Radio } from "./Radio";
import { ButtonV2 } from "../buttonV2";
import { useConnectStore } from "@/hooks/store/useDeviceStore";
import { gpuNames } from "@/data/gpuNames";
import { useState } from "react";

export function SecondForm({
  title,
  onNext,
}: {
  title: string;
  onNext: () => any;
}) {
  const { deviceType, setDeviceType } = useConnectStore();
  const [searchTerm, setSearchTerm] = useState("");

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
              <div className="text-xs text-[#5D7285] ml-4">
                If you opt for the GPU Worker but your device lacks a GPU,
                <br /> the setup will not succeed.
              </div>
            </div>
            <div className="grid grid-cols-2 gap-20">
              <div>
                <div className="bg-gradient-to-tr from-[#000D33] via-[#9A9A9A] to-[#000D33] p-px my-4 mx-2 rounded-md w-1/2">
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
                            checked={value == "gpu"}
                          />
                          <Radio
                            name="deviceType"
                            value="cpu"
                            text="CPU"
                            onChange={(value) => {
                              setValue(value);
                              setDeviceType(value);
                            }}
                            checked={value == "cpu"}
                          />
                        </div>
                      )}
                    </Field>

                    <div className="flex justify-end">
                      <ButtonV2>
                        <button>NEXT STEP</button>
                      </ButtonV2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#060B28] w-2/3 rounded-lg p-4 bg-opacity-25 ml-20 mb-4">
                <div>List of supported GPUs/CPUs</div>
                {/* <div className="border p-1 rounded text-slate-400 font-thin pl-10 my-1 w-3/4 text-sm">Search</div> */}
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
