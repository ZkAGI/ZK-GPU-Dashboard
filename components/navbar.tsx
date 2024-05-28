"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ButtonV1 } from "./buttonV1";
import { Sidebar, SidebarRoot } from "./sidebar";
import { LuMenu } from "react-icons/lu";
import { Drawer } from "vaul";
import { useSideBarNavStore } from "@/hooks/store/useSideBarStore";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { CustomWalletButton } from "./CustomWallet";

const Navbar = () => {
    const {setIsOpen, isOpen} = useSideBarNavStore()

  return (
    <div className="flex justify-between p-5 w-full bg-[#000D33]">
      <Image src={"/icons/logo.svg"} width={100} height={100} alt="logo" />
      <div className="flex gap-10 items-center justify-center md:hidden md:pointer-events-none">
        <button onClick={() => setIsOpen(true)}>
          <LuMenu className="size-7" />
        </button>
      </div>
      <div className="hidden pointer-events-none gap-10 items-center justify-center md:flex md:pointer-events-auto">
          <ButtonV1 link="">GET STARTED</ButtonV1>
          {/* <ButtonV1 link="">CONNECT WALLET</ButtonV1> */}
          {/* <WalletMultiButton style={{}} /> */}
          <CustomWalletButton/>
          {/* <div className="rounded-full bg-gray-400 size-10 justify-center items-center flex">
            P
          </div> */}
        </div>
    </div>
  );
};

export default Navbar;
