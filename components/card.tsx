import { CardItem, cardData } from "@/data/cardData";
import { Rocket } from '../components/icons/Rocket';
import { Explore } from "./icons/Explore";
import React from "react";
import { Dots } from "./icons/Dots";
import {Vector} from './icons/Vector'


const Card = () => {
  return (
    <div className="flex flex-col md:flex-row justify-around gap-12 mx-4 font-ttfirs">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="bg-gradient-to-br from-[#272A44] via-[#070121] to-[#272A44] rounded-lg relative"
        >
          <Dots/>
          <div className="w-80 h-48 rounded-lg p-4 m-0.5 bg-gradient-to-b from-[#010921] to-[#12152B] text-white">
            <div className="pb-2">
              {card.title === "Getting started with ZkAGI" && (
                <Rocket/>
              )}
              {card.title === "Explore the Marketplace" && (
                <Explore/>
              )}
              {card.title === "Learn more about ZkAGI" && (
                <Vector />
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

