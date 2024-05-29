import { CardItem as CardItemType, cardData } from "@/data/cardData";
import { Rocket } from '../components/icons/Rocket';
import { Explore } from "./icons/Explore";
import React, { useState } from "react";
import { Dots } from "./icons/Dots"; 
import { Vector } from './icons/Vector'
import { MotionValue, useMotionValue } from "framer-motion";
import { useMotionTemplate, motion } from "framer-motion";

const Card = () => {
  return (
    <div className="flex flex-col md:flex-row justify-around gap-12 mx-4 font-ttfirs">
      {cardData.map((card, index) => (
        <CardItem key={index} card={card} />
      ))}
    </div>
  );
};

const CardItem = ({ card }: { card: CardItemType }) => {
  const [isHovered, setIsHovered] = useState(false);
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  function onMouseEnter() {
    setIsHovered(true);
  }

  function onMouseLeave() {
    setIsHovered(false);
  }

  return (
    <div
      className="bg-gradient-to-br from-[#272A44] via-[#070121] to-[#272A44] rounded-lg relative"
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <AnimatedDots mouseX={mouseX} mouseY={mouseY} /> {/* Render the AnimatedDots component */}
      <div className="w-80 h-48 rounded-lg p-4 m-0.5 bg-gradient-to-b from-[#010921] to-[#12152B] text-white relative overflow-hidden">
        {isHovered && <CardPattern mouseX={mouseX} mouseY={mouseY} color="#4b5bff" />}
        <div className="pb-2 relative z-10">
          {card.title === "Getting started with ZkAGI" && <Rocket />}
          {card.title === "Explore the Marketplace" && <Explore />}
          {card.title === "Learn more about ZkAGI" && <Vector />}
        </div>
        <div className="text-lg pb-4 relative z-10">{card.title}</div>
        <div className="text-xs text-[#7E83A9] uppercase relative z-10">
          {card.description}
        </div>
      </div>
    </div>
  );
};

const AnimatedDots = ({ mouseX, mouseY }: { mouseX: MotionValue<number>, mouseY: MotionValue<number> }) => {
  const maskImage = useMotionTemplate`radial-gradient(200px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = {
    maskImage,
    WebkitMaskImage: maskImage,
  };

  return (
    <motion.div className="absolute inset-0 z-10" style={style}>
      <Dots /> 
    </motion.div>
  );
};

export function CardPattern({ mouseX, mouseY, color }: { mouseX: MotionValue<number>, mouseY: MotionValue<number>, color: string }) {
  let maskImage = useMotionTemplate`radial-gradient(200px at ${mouseX}px ${mouseY}px, white, transparent)`;
  let style = {
    maskImage,
    WebkitMaskImage: maskImage,
    background: color,
  };

  return (
    <motion.div className={`absolute inset-0 opacity-20 z-0`} style={style} />
  );
}

export default Card;