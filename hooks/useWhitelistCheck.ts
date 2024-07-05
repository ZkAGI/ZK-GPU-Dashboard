import { useState } from 'react';
import axios from 'axios';
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const KEY = process.env.API_KEY;

export const useWhitelistCheck = () => {
  const router = useRouter();
  const { wallet } = useWallet();
  const [isLoading, setIsLoading] = useState(false);

  const checkWhitelistAndRedirect = async () => {
    setIsLoading(true);
    const walletAddress = wallet?.adapter?.publicKey?.toString();

    if (!walletAddress) {
      toast.error('Please connect your wallet first');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios({
        method: "POST",
        url: `${BASE_URL}/api/whitelist`,
        headers: {
          "Content-Type": "application/json",
          "api-key": `${KEY}`
        },
        data: { address: walletAddress }
      });
      if(!response.data.whitelisted){
        toast.info('Your Wallet is not Whitelisted!')
      } else {
        router.push('/connect');
      }
    } catch (error) {
      console.error('Error checking whitelist:', error);
      toast.error('An error occurred while checking the whitelist');
    } finally {
      setIsLoading(false);
    }
  };

  return { checkWhitelistAndRedirect, isLoading };
};