
"use client";

import { WalletMultiButton, useWalletModal } from "@solana/wallet-adapter-react-ui";

export const CustomWalletButtons = () => {
  const { setVisible } = useWalletModal();

  const handleClick = () => {
    setVisible(true);
  };

  return (
    <button
      onClick={handleClick}
      className="transition-all ease-out duration-250 group min-w-32 w-full overflow-hidden  border-transparent bg-white text-white active:brightness-[85%] S"
      style={{
        clipPath:
          "polygon(0% 0%, calc(100% - 15px) 0%, 100% 15px, 100% 100%, 15px 100%, 0% calc(100% - 15px), 0% 100%, 0% 0%)",
      }}
    >
      <div
        className="transition-all ease-out duration-250 w-full overflow-hidden bg-gradient-to-r from-[#8160E4] to-[#93BEFF] hover:bg-white hover:text-black active:bg-white active:text-black group-active:brightness-[85%]"
        style={{
          clipPath:
            "polygon(0% 0%, calc(100% - 15px) 0%, 100% 15px, 100% 100%, 15px 100%, 0% calc(100% - 15px), 0% 100%, 0% 0%)",
        }}
      >
        <div className="transition-all ease-out duration-250 px-4 md:px-4 py-2 text-xs lg:text-base min-w-max text-center text-[#2D2E5F]">
          CONNECT WALLET
        </div>
      </div>
    </button>
  );
};
