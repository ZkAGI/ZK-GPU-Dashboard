"use client";

import { Drawer } from "vaul";
import { GoHomeFill } from "react-icons/go";
import { useSideBarNavStore } from "../hooks/store/useSideBarStore";
import { useWindowSize } from "@uidotdev/usehooks";
import { sidebarData } from "@/data/sidebarData";
import { BackgroundNeedHelp } from "./icons/BackgroundNeedHelp";
import Tooltips from "./Tooltip";
import Link from "next/link";

export function SidebarRoot({ children }: { children: React.ReactNode }) {
  const { getIsOpen } = useSideBarNavStore();
  const size = useWindowSize();
  return (
    <>
      {size && size && size.width && (
        <Drawer.Root direction="left" open={getIsOpen(size.width <= 768)} modal={size.width <= 768}>
          {children}
        </Drawer.Root>
      )}
    </>
  );
}

interface SidebarItemProps {
  name: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  href?: string;
}

export function SidebarItem(props: SidebarItemProps) {
  const { name, icon, disabled = false, href } = props;
  const { setIsOpen } = useSideBarNavStore();
  const size = useWindowSize();

  const onClick = () => {
    if (!disabled  && size && size.width && size.width <= 768) {
      setIsOpen(false);
    }
  };
  
const content = (
  <Link href={href || '#'} passHref>
  <div
    className={`py-2 px-4 rounded-md transition-colors flex space-x-2 items-center ${
      disabled ? 'text-gray-500 cursor-default' : 'text-white hover:bg-[#643ADE] cursor-pointer'
    }`}
    onClick={onClick}
  >
    {icon && <div className={`[&>svg]:size-4 ${disabled ? 'text-gray-500' : ''}`}>{icon}</div>}
    <p>{name}</p>
  </div>
  </Link>
);

return disabled ? (
  <Tooltips message="Coming Soon">
    {content}
  </Tooltips>
) : (
  content
);
}

export function Sidebar() {
  const { setIsOpen } = useSideBarNavStore();
  return (
    <Drawer.Portal>
      <Drawer.Overlay
        className="fixed inset-0 bg-[#0F132C]/40 md:hidden md:pointer-events-none"
        onClick={() => setIsOpen(false)}
      />

      <Drawer.Content className="outline-none bg-transparent flex h-full min-w-[250px] max-w-[320px] fixed top-0 left-0 rounded-xl pl-3 pt-20 pb-5">
        <div className="bg-gradient-to-tr from-[#000D33] via-[#9A9A9A] to-[#000D33] flex flex-col w-full rounded-xl">
          <div className="h-full bg-[#0F132C] m-px rounded-xl py-4 flex flex-col justify-between">
            <div className="flex flex-col space-y-1 m-2 flex-grow ">
              {sidebarData.map((item, index) => (
                <SidebarItem
                  key={index}
                  name={item.name}
                  icon={<item.icon />}
                  disabled={item.name === "Serve" || item.name === "Settings" || item.name === "Actors" || item.name === "Matrics" || item.name === "Logs" || item.name === "Playground" || item.name === "Model AI"}
                  href={item.name === "Dashboard" ? "/" : item.path}
                />
              ))}
            </div>
            <div className="flex flex-col rounded-lg m-2 px-3 py-5 relative flex-grow">
            <BackgroundNeedHelp />
              <div className="flex flex-row justify-between mb-5 z-50 text-white mt-2 bg-">
                <div className="col-span-3">
                  <h1 className="text-sm">Need Help ?</h1>
                  <h3 className="text-xs font-light">Please check our docs</h3>
                </div>
                <div className="size-7 bg-white rounded-md flex justify-center items-center mt-1">
                  <div className="size-4 rounded-full bg-blue-600 text-xs text-center">?</div>
                </div>
              </div>
              <div className="flex justify-center items-center z-50">
                <a href="https://zkagi.gitbook.io/introduction" className="bg-[#000D33] rounded-lg p-2 w-full text-sm text-center text-white">DOCUMENTATION</a>
              </div>
            </div>
          </div>
        </div>
      </Drawer.Content>
      <Drawer.Overlay />
    </Drawer.Portal>
  );
}
