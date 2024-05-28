import { CardItem, cardData } from "@/data/cardData";
import SvgIonRocketSharp from "@/src/components/icons/IonRocketSharp";
import SvgMaterialSymbolsExplore from "@/src/components/icons/MaterialSymbolsExplore";
import SvgVector from "@/src/components/icons/Vector";
import React from "react";
import SvgDots from '../src/components/icons/Dots';


const Card = () => {
  return (
    <div className="flex flex-row justify-around gap-12 mx-4 font-ttfirs">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="bg-gradient-to-br from-[#272A44] via-[#070121] to-[#272A44] rounded-lg relative"
        >
          <SvgDots className="absolute inset-0 w-full h-full"/>
          <div className="w-80 h-48 rounded-lg p-4 m-0.5 bg-gradient-to-b from-[#010921] to-[#12152B] text-white">
            <div className="pb-2">
              {card.title === "Getting started with ZkAGI" && (
                <SvgIonRocketSharp className="size-6 text-white" />
              )}
              {card.title === "Explore the Marketplace" && (
                <SvgMaterialSymbolsExplore className="size-10 text-white" />
              )}
              {card.title === "Learn more about ZkAGI" && (
                <SvgVector className="size-5 text-white" />
              )}
            </div>
            <div className="text-lg pb-4">{card.title}</div>
            <div className="text-xs text-[#7E83A9] uppercase">{card.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;

