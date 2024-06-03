import { useId } from "react";
import { Mac } from "../icons/mac";
import {Windows} from "../icons/windows";
import { Linux } from "../icons/linux";
import { Chip } from "../icons/Chip";

interface RadioProps {
  value: string;
  text: string;
  name: string;
  checked?: boolean;
  onChange?: (value: string) => any;
}

export function Radio(props: RadioProps) {
  const { text, value, name, checked, onChange } = props;
  const id = useId();

  return (
    <div className="">
      <div className="bg-gradient-to-tr from-[#000D33] via-[#9A9A9A] to-[#000D33] p-px my-4 rounded">
        <div className="grid grid-cols-3 p-2 rounded m-px bg-[#171D3D]">
            <div className="flex flex-row justify-start items-center gap-4 col-span-2">
                <div>
                    {text == 'macOS' && <Mac/> || text=='Windows' && <Windows/> || text=='Ubuntu' && <Linux/> || text=="GPU" && <Chip/> || text=="CPU" && <Chip/>}
                </div>
                          <div className="">
                <label htmlFor={id}>{text}</label>
                          </div>
            </div>
          <div className="flex justify-end">
            <input
              type="radio"
              id={id}
              value={value}
              name={name}
              checked={checked}
              className="opacity-0 absolute w-10 h-10"
              onClick={(e) => {
                if ((e.target as any).checked) {
                  onChange && onChange((e.target as any).value);
                }
              }}
            />
            {
                checked ? (
                    <svg
                    width="43"
                    height="34"
                    viewBox="0 0 43 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.5 0.5H34.3575L42.5 8.70597V33.5H8.64246L0.5 25.294V0.5Z"
                      stroke="#7E83A9"
                    />
                    <path
                      d="M4 4L32.1349 4L39 10.5V30H10.8651L4 23.5V4Z"
                      fill="white"
                    />
                  </svg>
                ) : (
                    <svg
                    width="43"
                    height="34"
                    viewBox="0 0 43 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.5 0.5H34.3575L42.5 8.70597V33.5H8.64246L0.5 25.294V0.5Z"
                      stroke="#7E83A9"
                    />
                  </svg>
                )
            }
          </div>
        </div>
      </div>
    </div>
  );
}
