import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ButtonV1 } from "./buttonV1";

const Navbar = () => {
  const [mobile, setMobile] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setMobile(true);
    } else {
      setMobile(false);
      setOpen(false);
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) {
        setMobile(true);
      } else {
        setMobile(false);
        setOpen(false);
      }
    });

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  return (
    <div className="flex justify-between p-5 w-full ">
      {open && (
        <div
          className="fixed inset-0 z-30  w-screen h-screen"
          onClick={() => {
            setOpen(false);
          }}
        ></div>
      )}
      <Image src={"/icons/logo.svg"} width={100} height={100} alt="logo" />
      {mobile ? (
        <div
          className="relative cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className="flex flex-col gap-[5px]">
            <div className="bg-white h-[3px] w-8 rounded-full"></div>
            <div className="bg-white h-[3px] w-8 rounded-full"></div>
            <div className="bg-white h-[3px] w-8 rounded-full"></div>
          </div>
          {open && (
            <>
              <div className="absolute z-40 right-5 top-12 flex flex-col gap-6 items-center justify-center">
                hi
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="flex gap-10 items-center justify-center">
          <ButtonV1 link="">GET STARTED</ButtonV1>
          <ButtonV1 link="">CONNECT WALLET</ButtonV1>
          <div className="rounded-full bg-gray-400 size-10 justify-center items-center flex">P</div>
        </div>
      )}
    </div>
  );
};

export default Navbar;