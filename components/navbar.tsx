"use client";

import Image from "next/image";
import { ButtonV1 } from "./buttonV1";
import { LuMenu } from "react-icons/lu";
import { useSideBarNavStore } from "../hooks/store/useSideBarStore";
import { CustomWalletButton } from "./CustomWallet";
import dynamic from "next/dynamic";

const WalletMultiButton = dynamic(
  () => import("@solana/wallet-adapter-react-ui").then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

const Navbar = () => {
    const {setIsOpen, isOpen} = useSideBarNavStore()
    

  return (
    <div className="flex justify-between p-5 w-full">
      <Image src={"/icons/logo.svg"} width={100} height={100} alt="logo" />
      <div className="flex gap-10 items-center justify-center md:hidden md:pointer-events-none">
        <button onClick={() => setIsOpen(true)}>
          <LuMenu className="size-7" />
        </button>
      </div>
      <div className="hidden pointer-events-none gap-10 items-center justify-center md:flex md:pointer-events-auto">
          <ButtonV1 link="">GET STARTED</ButtonV1>
          <CustomWalletButton/>
          {/* <WalletMultiButton style={{}}/> */}
          {/* <div className="rounded-full bg-gray-400 size-10 justify-center items-center flex">
            P
          </div> */}
        </div>
    </div>
  );
};

export default Navbar;
