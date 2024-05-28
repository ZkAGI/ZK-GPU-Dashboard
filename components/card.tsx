import { BiSolidRocket } from "react-icons/bi";
import { IoTelescope } from "react-icons/io5";
import { TbCardsFilled } from "react-icons/tb";

const Card = () =>{
    return(
        <div className="flex flex-row justify-around gap-12 mx-4">
                <div className="border w-80 h-48 rounded-lg p-4">
                    <div className="pb-2"><BiSolidRocket /></div>
                    <div className="text-lg pb-4">Getting started with ZkAGI</div>
                    <div className="text-xs">Learn how to deploy your first docker container on Akash in a few click using Console.</div>
                </div>
                <div className="border w-80 h-48 rounded-lg p-4">
                <div className="pb-2"><IoTelescope /></div>
                    <div className="text-lg pb-4">Explore the Marketplace</div>
                    <div className="text-xs">Browse through the marketplace of pre-made solutions with categories like blogs, blockchain nodes and more!</div>
                </div>
                <div className="border w-80 h-48 rounded-lg p-4">
                <div className="pb-2"><TbCardsFilled/></div>
                    <div className="text-lg pb-4">Learn more about ZkAGI</div>
                    <div className="text-xs">Want to know about the advantages of using a decentralized cloud compute marketplace?</div>
                </div>
      </div>
    )
}

export default Card