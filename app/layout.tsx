import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/navbar";
import { Sidebar, SidebarRoot } from "../components/sidebar";
import AppWalletProvider from "../components/AppWalletProvider";
import { SWRConfig } from "@/components/SWRConfig";
import { Toaster } from "sonner";
import { AppProps } from "next/app";

export const metadata: Metadata = {
  title: "ZkAGI Console",
  description: "GPU Dashboard Console",
  icons: ["images/favicon.ico"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#000D33] font-ttfirs text-white">
        <SWRConfig>
          <AppWalletProvider>
            <Navbar/>
            <SidebarRoot>
              <Sidebar />
            </SidebarRoot>
            <div className="md:pl-[280px] xl:pl-[310px]">{children}</div>
          </AppWalletProvider>
        </SWRConfig>
        <Toaster />
      </body>
    </html>
  );
}
