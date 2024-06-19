import { RadialBar } from "@nivo/radial-bar";
import { useWallet } from "@solana/wallet-adapter-react";
import { CSSProperties } from 'react';
import useSWR from "swr";

const color = "#08ff08";
const DTI = 0.98;

const w = 150;
const h = 150;
const m = 0;

const styles: { [key: string]: CSSProperties } = {
  root: {
    fontFamily: "TT Firs Neue",
    borderRadius: 12,
    color: "#ffffff",
    textAlign: "center",
    position: "relative",
    marginTop: 5,
    width: w,
    height: h
  }
};

const Metric = ({ center, xp }: { center: number[], xp: number }) => {
  return (
    <>
      <text
        x={center[0]}
        y={center[0]}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: 30,
          fill: "white"
        }}
      >
        {xp}
      </text>
      <text
        x={center[0] +40}
        y={center[0] +15}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: 20,
          fill: "white"
        }}
      >
        xp
      </text>
    </>
  );
};

export default function TotalEarningChart() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const { wallet } = useWallet();
  const walletAddress = wallet?.adapter?.publicKey?.toString();
  const { data, error } = useSWR(`${BASE_URL}/wallets/${walletAddress}/xp`, { refreshInterval: 8000 });
  return (
    <div className="App">
      <div style={styles.root}>
        <RadialBar
          width={w}
          height={h}
          valueFormat={"0"}
          maxValue={1}
          startAngle={-140}
          endAngle={60}
          cornerRadius={40}
          innerRadius={0.80}
          tracksColor="#6f6f6f"
          colors={[color]}
          data={[
            {
              id: "default",
              data: [{ x: "percentage", y: DTI }]
            }
          ]}
          //layers={["tracks", "bars", Metric]}
          layers={["tracks", "bars", ({ center }) => <Metric center={center} xp={data?.total_points ?? 100} />]}
          defs={[
            {
              id: 'gradientA',
              type: 'linearGradient',
              colors: [
                { offset: 0, color: '#05826e' },
                { offset: 100, color: '#079e7e' }
              ]
            }
          ]}
          fill={[
            {
              match: '*',
              id: 'gradientA'
            }
          ]}
          motionConfig="gentle"
        />
      </div>
    </div>
  );
}
