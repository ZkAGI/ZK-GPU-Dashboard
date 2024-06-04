// import { useWallet } from '@solana/wallet-adapter-react';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// // Define the types for the account information and error state
// interface AccountInfo {
//   name: string;
//   image: string;
// }

// export const WalletConnection: React.FC = () => {
//   const { wallet, connect, publicKey } = useWallet();
//   const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchAccountInfo = async () => {
//       if (publicKey) {
//         setLoading(true);
//         setError(null);
//         try {
//           const key = publicKey.toString();
//           const response = await axios.get(`https://names.solana.com/v1/resolve/${key}`);
//           const accountName = response.data.name;
//           const accountImage = `https://avatars.dicebear.com/api/initials/${accountName}.svg`;
//           setAccountInfo({ name: accountName, image: accountImage });
//         } catch (err) {
//           setError('Failed to fetch account information');
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     fetchAccountInfo();
//   }, [publicKey]);

//   return (
//     <div>
//       {!wallet && <button onClick={() => connect()}>Connect Wallet</button>}
//       {wallet && (
//         <div>
//           <p>Connected Wallet: {publicKey?.toString()}</p>
//           {loading && <p>Loading...</p>}
//           {error && <p>Error: {error}</p>}
//           {accountInfo && (
//             <div>
//               <p>Account Name: {accountInfo.name}</p>
//               <img src={accountInfo.image} alt="Account Image" />
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };


// import { useWallet } from '@solana/wallet-adapter-react';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// // Define the types for the account information and error state
// interface AccountInfo {
//   name: string;
//   image: string;
// }

// export const WalletConnection: React.FC = () => {
//   const { wallet, connect, publicKey } = useWallet();
//   const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchAccountInfo = async () => {
//       if (publicKey) {
//         setLoading(true);
//         setError(null);
//         try {
//           const key = publicKey.toString();
//           // Updated to use a valid Bonfida API endpoint
//           const response = await axios.get(`https://api.bonfida.com/ns/resolve/${key}`);
//           const accountName = response.data.result?.name || 'Unknown';
//           const accountImage = `https://avatars.dicebear.com/api/initials/${accountName}.svg`;
//           setAccountInfo({ name: accountName, image: accountImage });
//         } catch (err) {
//           setError('Failed to fetch account information');
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     fetchAccountInfo();
//   }, [publicKey]);

//   return (
//     <div>
//       {!wallet && <button onClick={() => connect()}>Connect Wallet</button>}
//       {wallet && (
//         <div>
//           <p>Connected Wallet: {publicKey?.toString()}</p>
//           {loading && <p>Loading...</p>}
//           {error && <p>Error: {error}</p>}
//           {accountInfo && (
//             <div>
//               <p>Account Name: {accountInfo.name}</p>
//               <img src={accountInfo.image} alt="Account Image" />
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

