import { Field, Form } from "houseform";
import { ButtonV2 } from "../buttonV2";
import { useWallet } from "@solana/wallet-adapter-react";
import { toast } from "sonner";
import axios from "axios";
import { Copy } from "../icons/Copy";
import { OpenLink } from "../icons/OpenLink";
import { OpenLink2 } from "../icons/OpenLink2";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useConnectStore } from "@/hooks/store/useDeviceStore";
import { useRouter } from 'next/navigation';

interface Gpu {
  name?: string;
  memoryTotal?: string;
  memoryUsed?: string;
  memory?: string;
}

interface SummaryItem {
  gpus?: Gpu[];
  hostname?: string;
}


export function ThirdForm({ onNext }: { onNext: () => any }) {
  const { data, error } = useSWR("http://65.20.68.31/api/nodes", {
    refreshInterval: 8000,
  });

  const [gpuName, setGpuName] = useState<string | undefined>(undefined);
  const [memoryTotal, setmemoryTotal] = useState<number | undefined>(undefined);
  const [memoryUsed, setmemoryUsed] = useState<number | undefined>(undefined);
  const [memory, setMemory] = useState<number | undefined>(undefined);
  const [formattedData, setFormattedData] = useState<any>(undefined);
  const [start, setStart] = useState<any>(undefined);
  const [diskTotal, setDiskTotal] = useState<any>(undefined);
  const [textToCopy, setTextToCopy] = useState("");
  const { deviceType } = useConnectStore();
  const router = useRouter();

  useEffect(() => {
    const summary: SummaryItem[] | undefined = data?.data?.summary;

    if (Array.isArray(summary)) {
      summary.forEach((item, index) => {
        if (Array.isArray(item.gpus)) {
          item.gpus.forEach((gpu, gpuIndex) => {
            if (gpu?.name) {
              setGpuName(gpu.name);
            }
          });
        }
      });
    } else {
      console.log("Summary is not an array or is undefined.");
    }
  }, [data]);

  const { publicKey, wallet } = useWallet();
  const walletAddress = wallet?.adapter?.publicKey?.toString();

  const dockerRunCommand = (deviceType === 'gpu')
    ? `docker run -dit -e "wallet=${walletAddress}" --privileged --network host --gpus all zkagi/connect2cluster:latest`
    : `docker run -dit -e "wallet=${walletAddress}" --privileged --network host zkagi/connect2cluster:latest`;


  const handleSubmit = async () => {
    try {
      const response: any = await axios({
        method: "GET",
        url: `http://65.20.68.31/wallets/${walletAddress}/ip_addresses`,
        data: {},
        headers: {
          "Content-Type": "application/json",
          "api-key": "zk-123321",
        },
      });
      if (response.status === 200) {
        const current_ip = response.data.ip_addresses[0];
        {
          data &&
            data?.data?.summary.map(async (node: any) => {
              if (node?.ip === current_ip) {
                try {    
                  const postResponse = await axios({
                    method: "POST",
                    url: "http://65.20.68.31/ips",
                    data: {
                      ip_address: current_ip,
                      node_id: node.raylet.nodeId,
                    },
                    headers: {
                      "Content-Type": "application/json",
                      "api-key": "zk-123321",
                    },
                  });
                  if (postResponse.status === 200) {
                    let totalMemory = 0;
                    let usedMemory = 0;
                    if (Array.isArray(node.gpus)) {
                      node.gpus.forEach((gpu: Gpu) => {
                        if (gpu?.memoryTotal && gpu?.memoryUsed) {
                          totalMemory += Number(gpu.memoryTotal);
                          usedMemory += Number(gpu.memoryUsed);
                          setmemoryTotal(totalMemory);
                          setmemoryUsed(usedMemory);
                        }
                      });
                    }

                    if (Array.isArray(node.mem)) {
                      setMemory(Number(node.mem[1]) / (1024 * 1024 * 1024));
                    }

                    if (node?.raylet.startTimeMs) {
                      setStart(node?.raylet.startTimeMs);
                      const date = new Date(Number(start));
                      setFormattedData(date.toISOString());
                    }

                    if (node.disk) {
                      const rootDisk = node.disk["/"];
                      setDiskTotal(rootDisk.total / (1024 * 1024 * 1024));
                    }
                    const totalMemoryGb = (totalMemory / 1024).toFixed(2);

                    try {
                      const postResponse2 = await axios({
                        method: "POST",
                        url: "http://65.20.68.31/nodes",
                        data: {
                          node_id: node.raylet.nodeId,
                          start_time: formattedData,
                          gpu: gpuName,
                          gram: totalMemoryGb,
                          memory: memory?.toString(),
                          storage: diskTotal?.toString(),
                        },
                        headers: {
                          "Content-Type": "application/json",
                          "api-key": "zk-123321",
                        },
                      });
                      if (postResponse2.status === 200) {
                        toast.success("Successfully connected!");
                        router.push('/cluster')
                        
                      }
                    } catch (error) {
                      console.error("Error making POST request:", error);
                    }
                  }
                } catch (error) {
                  console.error("Error making POST request:", error);
                }
              }
            });
        }
      } else {
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
          <div>
            <div className="text-lg">3. Script File</div>
            <div className="text-xs text-[#5D7285] ml-4">
              Download Script File to Install Drivers
            </div>
          </div>
          <Field name="firstName">
            {({ value, setValue }) => (
              <div className="bg-gradient-to-tr from-[#000D33] via-[#9A9A9A] to-[#000D33] p-px my-4 mx-2 rounded-md w-1/2">
                <div className="bg-[#060B28] p-4 rounded-md">
                  <div className="border-2 border-[#2d3150] rounded-lg px-4 py-2 m-2">
                    <div className="text-sm"> Download Docker Desktop</div>
                    <div className="border border-[#858699] p-2 rounded-md mx-10 my-2 text-[#858699] flex flex-row justify-between items-center">
                      <div className="text-xs">
                        https://www.docker.com/products/docker-desktop/
                      </div>
                      <div className=" p-1 ">
                      <a target="_blank" href="https://www.docker.com/products/docker-desktop/"><OpenLink /></a>
                      </div>
                    </div>
                  </div>
                  <div className="border-2 border-[#2d3150] rounded-lg px-4 py-2 m-2">
                    <div>
                      <div className="text-sm">Download Docker Image</div>
                      <CopyToClipboard
                        text="docker pull zkagi/connect2cluster:latest"
                        onCopy={() =>
                          toast.success("Text copied to clipboard!")
                        }
                      >
                        <div className="border border-[#858699] p-2 rounded-md mx-10 my-2 text-[#858699] flex flex-row justify-between items-center">
                          <div className="text-xs">
                            docker pull zkagi/connect2cluster:latest
                          </div>
                          <div className="p-1">
                            <Copy />
                          </div>
                        </div>
                      </CopyToClipboard>
                    </div>
                    <div className="mx-10 my-4">
                    <a target="_blank" href="https://docs.nvidia.com/cuda/cuda-installation-guide-microsoft-windows/index.html"><div className="text-[#0075FF] text-xs flex flex-row gap-1 items-center">
                        <div>
                          <OpenLink2 />
                        </div>
                        <div>CUDA Toolkit download and setup</div>
                      </div></a>
                      <a target="_blank" href="https://www.nvidia.com/Download/index.aspx"><div className="text-[#0075FF] text-xs flex flex-row gap-1 items-center">
                        <div>
                          <OpenLink2 />
                        </div>
                        <div>Nvidia Drivers Installation</div>
                      </div></a>
                    </div>
                    <div>
                      <div className="text-sm">Run Docker Image</div>
                      <CopyToClipboard
                        text={dockerRunCommand}
                        onCopy={() =>
                          toast.success("Text copied to clipboard!")
                        }
                      >
                        <div className="border border-[#858699] p-2 rounded-md mx-10 my-2 text-[#858699] flex flex-row items-center justify-between">
                          <div className="w-3/4 text-xs">
                          {dockerRunCommand}
                          </div>
                          <div className=" p-1">
                            <Copy />
                          </div>
                        </div>
                      </CopyToClipboard>
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
