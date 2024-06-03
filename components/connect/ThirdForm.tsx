import { Field, Form } from "houseform";
import { ButtonV2 } from "../buttonV2";
import { useWallet } from "@solana/wallet-adapter-react";
import { toast } from 'sonner'
import axios from "axios";
import { Copy } from "../icons/Copy";
import { OpenLink } from '../icons/OpenLink';
import { OpenLink2 } from '../icons/OpenLink2';

export function ThirdForm({ onNext }: { onNext: () => any }) {
  const { publicKey, wallet } = useWallet();
  const walletAddress = wallet?.adapter?.publicKey?.toString();

  const handleSubmit = async () => {
    console.log('h')
    try {
      const response: any = await axios({
        method: "POST",
        url: "http://104.131.170.196:3000/wallets/${walletAddress}/ip_addresses",
        data: {},
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        toast.success("Successfully connected!");
    }else{
        toast.error("Not connected!");
    }
    } catch {
      console.log("error");
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      {({ submit, isValid }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            isValid && submit();
          }}
        >
          <h1>third form</h1>
          <Field name="firstName">
            {({ value, setValue }) => (
              <div className="bg-gradient-to-tr from-[#000D33] via-[#9A9A9A] to-[#000D33] p-px my-4 mx-2 rounded-md w-1/2">
                <div className="bg-[#060B28] p-4 rounded-md">
                  {/* <input
                        type='text'
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    /> */}
                  <div className="border-2 border-[#2d3150] rounded-lg px-4 py-2 m-2">
                    <div className="text-sm"> Download Docker Desktop</div>
                    <div className="border border-[#858699] p-2 rounded-md mx-10 my-2 text-[#858699] flex flex-row justify-between items-center">
                      <div className="text-xs">
                        https://www.docker.com/products/docker-desktop/
                      </div>
                      <div className=" p-1 "><OpenLink/></div>
                    </div>
                  </div>
                  <div className="border-2 border-[#2d3150] rounded-lg px-4 py-2 m-2">
                    <div>
                      <div className="text-sm">Download Docker Image</div>
                      <div className="border border-[#858699] p-2 rounded-md mx-10 my-2 text-[#858699] flex flex-row justify-between items-center">
                        <div className="text-xs">
                          docker pull Zkagi/ConnectCluster
                        </div>
                        <div className="p-1"><Copy/></div>
                      </div>
                    </div>
                    <div className="mx-10 my-4">
                      <div className="text-[#0075FF] text-xs flex flex-row gap-1 items-center">
                        <div><OpenLink2/></div>
                        <div>CUDA Toolkit download and setup</div>
                      </div>
                      <div className="text-[#0075FF] text-xs flex flex-row gap-1 items-center">
                      <div><OpenLink2/></div>
                        <div>Nvidia Drivers Installation</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm">Run Docker Image</div>
                      <div className="border border-[#858699] p-2 rounded-md mx-10 my-2 text-[#858699] flex flex-row items-center justify-between">
                        <div className="w-3/4 text-xs">
                          {`docker run -dit -e "wallet=${walletAddress}" --privileged --network host Zkagi/ConnectCluster`}
                        </div>
                        <div className=" p-1"><Copy/></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Field>

          <div className="flex justify-end w-1/2 my-2">
            <div className=" flex justify-end w-1/2">
              <ButtonV2>
                <button>CONNECT</button>
              </ButtonV2>
            </div>
          </div>
        </form>
      )}
    </Form>
  );
}
