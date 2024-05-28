"use client";

import { Drawer } from "vaul";
import { GoHomeFill } from "react-icons/go";
import { useSideBarNavStore } from "../hooks/store/useSideBarStore";
import { useWindowSize } from "@uidotdev/usehooks";
import { sidebarData } from "@/data/sidebarData";

export function SidebarRoot({ children }: { children: React.ReactNode }) {
  const { getIsOpen } = useSideBarNavStore();
  const size = useWindowSize();
  return (
    <>
      {size && size && size.width && (
        <Drawer.Root direction="left" open={getIsOpen(size.width <= 768)} modal={false}>
          {children}
        </Drawer.Root>
      )}
    </>
  );
}

interface SidebarItemProps {
  name: string;
  icon?: React.ReactNode;
}

export function SidebarItem(props: SidebarItemProps) {
  const { name, icon } = props;
  const { setIsOpen } = useSideBarNavStore();
  const size = useWindowSize();

  const onClick = () => {
    if (size && size.width && size.width <= 768) {
      setIsOpen(false);
    }
  };

  return (
    <div
      className="py-1.5 px-4 text-white rounded-md hover:bg-[#643ADE] transition-colors cursor-pointer flex space-x-2 items-center"
      onClick={onClick}
    >
      {icon && <div className="[&>svg]:size-4">{icon}</div>}
      <p>{name}</p>
    </div>
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

      <Drawer.Content className="outline-none bg-transparent flex h-full w-[250px] fixed top-0 left-0 rounded-xl pl-3 pt-20 pb-5">
        <div className="bg-gradient-to-tr from-[#000D33] via-white to-[#000D33] flex flex-col w-full rounded-xl">
          <div className="h-full bg-[#0F132C] m-0.5 rounded-xl py-4 flex flex-col justify-between">
            <div className="flex flex-col space-y-1 m-2 ">
              {sidebarData.map((item, index) => (
                <SidebarItem
                  key={index}
                  name={item.name}
                  icon={<item.icon />}
                />
              ))}
            </div>
            <div className="flex flex-col border rounded m-2 px-3 py-5">
              <div className="flex flex-row justify-between mb-5">
                <div className="col-span-3">
                  <h1 className="text-sm font-semibold">Need Help ?</h1>
                  <h3 className="text-xs font-light">Please check our docs</h3>
                </div>
                <div className="size-7 bg-white rounded flex justify-center items-center mt-1">
                  <div className="size-4 rounded-full bg-blue-600 text-xs text-center">?</div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button className="border rounded p-2 w-full text-sm">DOCUMENTATION</button>
              </div>
            </div>
          </div>
        </div>
      </Drawer.Content>
      <Drawer.Overlay />
    </Drawer.Portal>
  );
}
