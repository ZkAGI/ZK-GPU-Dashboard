"use client";

import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { BaseWalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

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
  const {  publicKey, wallet } = useWallet();


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

// "use client";

// import { useWalletModal } from "@solana/wallet-adapter-react-ui";
// import { BaseWalletMultiButton } from "@solana/wallet-adapter-react-ui";
// import { useConnection, useWallet } from "@solana/wallet-adapter-react";

// import { Connection, PublicKey } from '@solana/web3.js';
// import { getDomainKey, reverseLookup, NameRegistryState, getAllDomains } from '@bonfida/spl-name-service';
// import { useEffect, useState } from "react";

// async function getUserMetadata(connection: Connection, publicKey: PublicKey): Promise<{ name: string, image: string }> {
//   try {
//     // Get all domain keys for the wallet
//     const allDomainKeys = await getAllDomains(connection, publicKey);

//     if (!allDomainKeys || allDomainKeys.length === 0) {
//       console.log(`No domains found for public key: ${publicKey.toBase58()}`);
//       return { name: 'Unknown User', image: '/path/to/default-image.png' };
//     }

//     console.log(`Found ${allDomainKeys.length} domain keys for public key: ${publicKey.toBase58()}`);

//     // Iterate through the domain keys to fetch metadata
//     for (const key of allDomainKeys) {
//       try {
//         const domain = await reverseLookup(connection, key);

//         if (domain) {
//           const { pubkey: domainKey } = await getDomainKey(domain);
//           const registry = await NameRegistryState.retrieve(connection, domainKey);

//           if (registry && (registry as any).data && (registry as any).data.url) {
//             const metadataUrl = (registry as any).data.url;
//             const response = await fetch(metadataUrl);

//             if (response.ok) {
//               const metadata = await response.json();
//               return {
//                 name: metadata.name || 'Unknown User',
//                 image: metadata.image || '/path/to/default-image.png',
//               };
//             }
//           }
//         }
//       } catch (error) {
//         console.error(`Error processing domain key ${key.toBase58()}:`, error);
//       }
//     }

//     return { name: 'Unknown User', image: '/path/to/default-image.png' };
//   } catch (error) {
//     console.error('Error fetching user metadata:', error);
//     return { name: 'Unknown User', image: '/path/to/default-image.png' };
//   }
// }

// const LABELS = {
//   "change-wallet": "Change wallet",
//   connecting: "Connecting ...",
//   "copy-address": "Copy address",
//   copied: "Copied",
//   disconnect: "Disconnect",
//   "has-wallet": "Connect",
//   "no-wallet": "Select Wallet",
// };

// export const CustomWalletButton = () => {
//   const { setVisible } = useWalletModal();
//   const { publicKey, wallet } = useWallet();
//   const { connection } = useConnection();
//   const [userData, setUserData] = useState({ name: 'User', image: '/path/to/default-image.png' });
//   const walletAddress = wallet?.adapter?.publicKey?.toString() || '';

//   useEffect(() => {
//     if (publicKey) {
//       getUserMetadata(connection, publicKey).then(setUserData);
//     } else if (walletAddress) {
//       // For testing purposes
//       getUserMetadata(connection, new PublicKey(walletAddress)).then(setUserData);
//     }
//   }, [publicKey, walletAddress, connection]);

//   const handleClick = () => {
//     setVisible(true);
//   };

//   return (
//     <div className="flex items-center justify-center relative">
//       {publicKey ? (
//         <BaseWalletMultiButton
//           labels={LABELS}
//           className="transition-all ease-out duration-250 w-full overflow-hidden bg-[#010921] hover:bg-white hover:text-black active:bg-white active:text-black group-active:brightness-[85%]"
//           style={{
//             clipPath:
//               "polygon(0% 0%, calc(100% - 15px) 0%, 100% 15px, 100% 100%, 15px 100%, 0% calc(100% - 15px), 0% 100%, 0% 0%)",
//           }}
//         >
//           <img src={userData.image} alt="User" className="w-6 h-6 rounded-full inline-block mr-2" />
//           <span>{userData.name}</span>
//         </BaseWalletMultiButton>
//       ) : (
//         <div
//           className="transition-all ease-out duration-250 group min-w-32 w-full overflow-hidden border-[1px] border-transparent bg-white text-white active:brightness-[85%] S"
//           style={{
//             clipPath:
//               "polygon(0% 0%, calc(100% - 15px) 0%, 100% 15px, 100% 100%, 15px 100%, 0% calc(100% - 15px), 0% 100%, 0% 0%)",
//           }}
//           onClick={handleClick}
//         >
//           <div
//             className="transition-all ease-out duration-250 w-full overflow-hidden bg-[#010921] hover:bg-white hover:text-black active:bg-white active:text-black group-active:brightness-[85%]"
//             style={{
//               clipPath:
//                 "polygon(0% 0%, calc(100% - 15px) 0%, 100% 15px, 100% 100%, 15px 100%, 0% calc(100% - 15px), 0% 100%, 0% 0%)",
//             }}
//           >
//             <div className="transition-all ease-out duration-250 px-4 md:px-4 py-2 text-xs lg:text-base min-w-max text-center">
//               CONNECT WALLET
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
