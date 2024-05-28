"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ButtonV1 } from "./buttonV1";
import { Sidebar, SidebarRoot } from "./sidebar";
import { LuMenu } from "react-icons/lu";
import { Drawer } from "vaul";
import { useSideBarNavStore } from "@/hooks/store/useSideBarStore";

const Navbar = () => {
    const {setIsOpen, isOpen} = useSideBarNavStore()
//   const [mobile, setMobile] = useState(false);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     if (window.innerWidth < 768) {
//       setMobile(true);
//     } else {
//       setMobile(false);
//       setOpen(false);
//     }
//     window.addEventListener("resize", () => {
//       if (window.innerWidth < 768) {
//         setMobile(true);
//       } else {
//         setMobile(false);
//         setOpen(false);
//       }
//     });

//     return () => {
//       window.removeEventListener("resize", () => {});
//     };
//   }, []);

  return (
    <div className="flex justify-between p-5 w-full bg-[#000D33]">
      {/* {open && (
        <div
          className="fixed inset-0 z-30  w-screen h-screen"
          onClick={() => {
            setOpen(false);
          }}
        ></div>
      )} */}
      <Image src={"/icons/logo.svg"} width={100} height={100} alt="logo" />
      {/* {mobile ? (
        <div>
          <SidebarRoot>
            <Sidebar />
            <Drawer.Trigger>
              <LuMenu className="size-7" />
            </Drawer.Trigger>
          </SidebarRoot>
        </div>
      ) : (
        <div className="flex gap-10 items-center justify-center">
          <ButtonV1 link="">GET STARTED</ButtonV1>
          <ButtonV1 link="">CONNECT WALLET</ButtonV1>
          <div className="rounded-full bg-gray-400 size-10 justify-center items-center flex">
            P
          </div>
        </div>
      )} */}
      <div className="flex gap-10 items-center justify-center md:hidden md:pointer-events-none">
        <button onClick={() => setIsOpen(true)}>
          <LuMenu className="size-7" />
        </button>
      </div>
      <div className="hidden pointer-events-none gap-10 items-center justify-center md:flex md:pointer-events-auto">
          <ButtonV1 link="">GET STARTED</ButtonV1>
          <ButtonV1 link="">CONNECT WALLET</ButtonV1>
          <div className="rounded-full bg-gray-400 size-10 justify-center items-center flex">
            P
          </div>
        </div>
    </div>
  );
};

export default Navbar;
