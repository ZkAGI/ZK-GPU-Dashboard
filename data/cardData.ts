import { BiSolidRocket } from "react-icons/bi";
import { IoTelescope } from "react-icons/io5";
import { TbCardsFilled } from "react-icons/tb";
import { IconType } from "react-icons";
import SvgIonRocketSharp from '../src/components/icons/IonRocketSharp';
import SvgMaterialSymbolsExplore from '../src/components/icons/MaterialSymbolsExplore';
import SvgVector from '../src/components/icons/Vector';

export interface CardItem {
  icon: IconType;
  title: string;
  description: string;
}

export const cardData: CardItem[] = [
  {
    icon: SvgIonRocketSharp,
    title: "Getting started with ZkAGI",
    description:
      "Learn how to deploy your first docker container on in a few click using Console.",
  },
  {
    icon: SvgMaterialSymbolsExplore,
    title: "Explore the Marketplace",
    description:
      "Browse through the marketplace of pre-made solutions with categories like blogs, blockchain nodes and more!",
  },
  {
    icon: SvgVector,
    title: "Learn more about ZkAGI",
    description:
      "Want to know about the advantages of using a decentralized cloud compute marketplace?",
  },
];