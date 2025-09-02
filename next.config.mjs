/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BASE_URL: "https://zynapse.zkagi.ai",
    API_KEY: "zk-123321",
    NEXT_PUBLIC_CIVIC_CLIENT_ID: process.env.NEXT_PUBLIC_CIVIC_CLIENT_ID,
  },
};

export default nextConfig;