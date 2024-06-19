"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";

export const ButtonV1 = ({
  children,
  link,
}: {
  children: React.ReactNode;
  link: string;
}) => {
  const { publicKey } = useWallet();
  return (
    <Link href={link} className="">
    <div
      className=" transition-all ease-out duration-250 group min-w-32   w-full overflow-hidden border-[1px] border-transparent bg-white   text-white   active:brightness-[85%] S"
      style={{
        clipPath:
          "polygon(0% 0%, calc(100% - 15px) 0%, 100% 15px, 100% 100%, 15px 100%, 0% calc(100% - 15px), 0% 100%, 0% 0%)",
      }}
    >
      <div
        className=" transition-all ease-out duration-250   w-full overflow-hidden bg-[#010921]   hover:bg-white  hover:text-black active:bg-white active:text-black group-active:brightness-[85%] "
        style={{
          clipPath:
            " polygon(0% 0%, calc(100% - 15px) 0%, 100% 15px, 100% 100%, 15px 100%, 0% calc(100% - 15px), 0% 100%, 0% 0%)",
        }}
      >
        <div className=" transition-all ease-out duration-250 px-5 md:px-7 py-2 text-xs lg:text-base min-w-max text-center">
          {children}
        </div>
      </div>
    </div>
  </Link>
  );
};
