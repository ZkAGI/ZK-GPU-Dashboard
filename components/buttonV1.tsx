"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";

export const ButtonV1 = ({
  children,
  link,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  link?: string;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  const { publicKey } = useWallet();

  const buttonContent = (
    <div
      className={`transition-all ease-out duration-250 group min-w-32 w-full overflow-hidden border-[1px] border-transparent bg-white text-white ${disabled ? 'opacity-50 cursor-not-allowed' : 'active:brightness-[85%]'}`}
      style={{
        clipPath:
          "polygon(0% 0%, calc(100% - 15px) 0%, 100% 15px, 100% 100%, 15px 100%, 0% calc(100% - 15px), 0% 100%, 0% 0%)",
      }}
    >
      <div
        className={`transition-all ease-out duration-250 w-full overflow-hidden bg-[#010921] ${disabled ? '' : 'hover:bg-white hover:text-black active:bg-white active:text-black'} group-active:brightness-[85%]`}
        style={{
          clipPath:
            "polygon(0% 0%, calc(100% - 15px) 0%, 100% 15px, 100% 100%, 15px 100%, 0% calc(100% - 15px), 0% 100%, 0% 0%)",
        }}
      >
        <div className="transition-all ease-out duration-250 px-5 md:px-7 py-2 text-xs lg:text-base min-w-max text-center">
          {children}
        </div>
      </div>
    </div>
  );

  if (link) {
    return <Link href={link}>{buttonContent}</Link>;
  } else {
    return (
      <button onClick={onClick} disabled={disabled}>
        {buttonContent}
      </button>
    );
  }
};