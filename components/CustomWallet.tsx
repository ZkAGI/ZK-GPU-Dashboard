"use client";

import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { BaseWalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from "sonner";

const API_KEY = process.env.API_KEY;
const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

const LABELS = {
  "change-wallet": "Change wallet",
  connecting: "Connecting ...",
  "copy-address": "Copy address",
  copied: "Copied",
  disconnect: "Disconnect",
  "has-wallet": "Connect",
  "no-wallet": "Select Wallet",
};

export const CustomWalletButton = () => {
  const { setVisible } = useWalletModal();
  const { publicKey, wallet } = useWallet();
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const checkWhitelist = async () => {
      if (publicKey && !isChecking) {
        setIsChecking(true);
        const walletAddress = publicKey.toString();

        let bodyContent = JSON.stringify({
          "address": walletAddress
        });

        try {
          const response = await axios({
            method: "POST",
            url: `${API_URL}/whitelist-wallet`,
            headers: {
              "Accept": "/",
              "User-Agent": "Thunder Client (https://www.thunderclient.com)",
              "api-key": API_KEY,
              "Content-Type": "application/json"
            },
            data: bodyContent,
            validateStatus: (status) => {
              return status < 500;
            }
          });

          console.log('Full response: ', response.data.message);
          console.log('Response data: ', response.data);

          if (response.status === 200 || response.status === 400 || response.status === 201) {
            const message = response.data.message.trim();

            if (message === "Wallet address already exists") {
              toast.success('Welcome back!');
            } else if (response.data.address === walletAddress) {
              toast.success('Your wallet has been successfully whitelisted!');
            } else {
              toast.error('Your wallet is not whitelisted');
            }
          } else {
            // If the status is not 200, it's treated as an error
            toast.error('An error occurred: ' + (response.data.message.trim() || 'Unknown error'));
          }
        } catch (error) {
          console.error('Error checking whitelist:', error);
          toast.error('An error occurred while checking the whitelist');
        } finally {
          setIsChecking(false);
        }
      }
    };

    checkWhitelist();
  }, [publicKey, wallet]);



  const handleClick = () => {
    setVisible(true);
  };

  return (
    <div className="flex items-center justify-center relative">
      {publicKey ? (
        <BaseWalletMultiButton
          labels={LABELS}
          className="transition-all ease-out duration-250 w-full overflow-hidden bg-[#010921] hover:bg-white hover:text-black active:bg-white active:text-black group-active:brightness-[85%]"
          style={{
            clipPath:
              "polygon(0% 0%, calc(100% - 15px) 0%, 100% 15px, 100% 100%, 15px 100%, 0% calc(100% - 15px), 0% 100%, 0% 0%)",
          }}
        />
      ) : (
        <div
          className="transition-all ease-out duration-250 group min-w-32 w-full overflow-hidden border-[1px] border-transparent bg-white text-white active:brightness-[85%] S"
          style={{
            clipPath:
              "polygon(0% 0%, calc(100% - 15px) 0%, 100% 15px, 100% 100%, 15px 100%, 0% calc(100% - 15px), 0% 100%, 0% 0%)",
          }}
          onClick={handleClick}
        >
          <div
            className="transition-all ease-out duration-250 w-full overflow-hidden bg-[#010921] hover:bg-white hover:text-black active:bg-white active:text-black group-active:brightness-[85%]"
            style={{
              clipPath:
                "polygon(0% 0%, calc(100% - 15px) 0%, 100% 15px, 100% 100%, 15px 100%, 0% calc(100% - 15px), 0% 100%, 0% 0%)",
            }}
          >
            <div className="transition-all ease-out duration-250 px-4 md:px-4 py-2 text-xs lg:text-base min-w-max text-center">
              CONNECT WALLET
            </div>
          </div>
        </div>
      )}
    </div>
  );
};