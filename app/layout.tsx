import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Sidebar, SidebarRoot } from "@/components/sidebar";
import AppWalletProvider from "@/components/AppWalletProvider";

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
      <body className="bg-[#000D33] ">
        <AppWalletProvider>
          <SidebarRoot>
            <Navbar />
            <Sidebar />
          </SidebarRoot>
          <div className="md:pl-[280px]">{children}</div>
        </AppWalletProvider>
      </body>
    </html>
  );
}
