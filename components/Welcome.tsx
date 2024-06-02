import React from 'react';
import Card from './card';
import { CustomWalletButtons } from './CustomWalletButton';
import { Illustration } from './icons/Illustration';

const WelcomeSection: React.FC = () => {
  return (
    <div className="mx-8 p-2 mt-5 flex flex-col justify-center items-center gap-8">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="text-3xl bg-gradient-to-r from-[#A4C8FF] via-[#A992ED] to-[#643ADE] bg-clip-text text-transparent">
          <h1
            style={{
              textShadow: " #A992ED 5px 5px 40px",
            }}
          >
            Welcome to ZkAGI
          </h1>
        </div>
        <div className="mt-2 border-[#ffffff1b] border-b w-1/2"></div>
      </div>
      <div>
        <Card />
      </div>
      <div className="relative mt-9 rounded-md">
        <div className="absolute inset-0 bg-gradient-to-r from-[#A4C8FF] via-[#A992ED] to-[#643ADE] blur-md rounded-md"></div>
        <div className="p-px">
          <CustomWalletButtons />
        </div>
      </div>
      <div className="">
        <Illustration />
      </div>
    </div>
  );
}

export default WelcomeSection;

