import { RadialBar } from "@nivo/radial-bar";
import { CSSProperties } from 'react'

const color = "#4589FF";
const DTI = 0.15;

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

const Metric = ({ center }: { center: number[] }) => {
  return (
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
      {DTI * 100}
    </text>
  );
};

export default function NetworkCapacityChart() {
  return (
    <div className="App">
      <div  style={styles.root}>
        <RadialBar
          width={w}
          height={h}
        //   margin={m}
          valueFormat={"0"}
          maxValue={1}
          startAngle={-110}
          endAngle={110}
        //   paddingTop={0}
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
          layers={["tracks", "bars", Metric]}
        />
      </div>
    </div>
  );
}