"use client";

export const ButtonV2 = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
      <div
        className=" transition-all ease-out duration-250 group min-w-32   w-2/3 overflow-hidden border-[1px] border-transparent bg-white   text-white   active:brightness-[85%] S"
        style={{
          clipPath:
            "polygon(0% 0%, calc(100% - 15px) 0%, 100% 15px, 100% 100%, 15px 100%, 0% calc(100% - 15px), 0% 100%, 0% 0%)",
        }}
      >
        <div
          className=" transition-all ease-out duration-250   w-full overflow-hidden bg-[#010921]   hover:bg-white  hover:text-black active:bg-white active:text-black group-active:brightness-[85%] "
          style={{
            clipPath:
              " polygon(0% 0%, calc(100% - 15px) 0%, 100% 15px, 100% 100%, 15px 100%, 0% calc(100% - 15px), 0% 100%, 0% 0%)",
          }}
        >
          <div className=" transition-all ease-out duration-250 px-5 md:px-7 py-2 text-xs lg:text-base min-w-max text-center bg-white text-black">
            {children}
          </div>
        </div>
      </div>
  );
}