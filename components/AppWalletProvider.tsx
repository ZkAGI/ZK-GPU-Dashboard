// "use client";
 
// import React, { useMemo } from "react";
// import {
//   ConnectionProvider,
//   WalletProvider,
// } from "@solana/wallet-adapter-react";
// import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
// import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
// import { clusterApiUrl } from "@solana/web3.js";
//  import { PhantomWalletAdapter,SolflareWalletAdapter, CoinbaseWalletAdapter } from "@solana/wallet-adapter-wallets";

// require("@solana/wallet-adapter-react-ui/styles.css");
 
// export default function AppWalletProvider({
//     children,
//   }: {
//     children: React.ReactNode;
//   }) {
//     const network = WalletAdapterNetwork.Devnet;
//     const endpoint = useMemo(() => clusterApiUrl(network), [network]);
//     const wallets = useMemo(
//       () => [
//         new PhantomWalletAdapter(),
//         new SolflareWalletAdapter(),
//         new CoinbaseWalletAdapter()
//       ],
//       [network],
//     );
   
//     return (
//       <ConnectionProvider endpoint={endpoint}>
//         <WalletProvider wallets={wallets} autoConnect>
//           <WalletModalProvider>{children}</WalletModalProvider>
//         </WalletProvider>
//       </ConnectionProvider>
//     );
//   }


"use client";
 
import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { PhantomWalletAdapter, SolflareWalletAdapter, CoinbaseWalletAdapter } from "@solana/wallet-adapter-wallets";
import { CivicAuthProvider } from "@civic/auth-web3/react";

require("@solana/wallet-adapter-react-ui/styles.css");
 
export default function AppWalletProvider({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    
    // When using Civic Auth, you can either use an empty array to let all wallets be auto-discovered
    // or include specific wallet adapters alongside Civic
    const wallets = useMemo(
      () => [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter(),
        new CoinbaseWalletAdapter()
        // Civic will be automatically discovered and added
      ],
      [network],
    );
   
    return (
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <CivicAuthProvider 
              clientId={process.env.NEXT_PUBLIC_CIVIC_CLIENT_ID!}
              // Optional: configure additional Civic Auth options
              config={{
                // Add any additional configuration here
              }}
            >
              {children}
            </CivicAuthProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    );
  }