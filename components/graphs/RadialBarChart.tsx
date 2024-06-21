import { RadialBar } from "@nivo/radial-bar";
import { CSSProperties } from 'react';

const color = "#4589FF";
const w = 150;
const h = 150;
const m = 0;

interface RadialBarChartProps {
  aliveCount: number;
  gpuCount: number;
}

const styles: { [key: string]: CSSProperties } = {
  root: {
    fontFamily: "TT Firs Neue",
    borderRadius: 12,
    color: "#ffffff",
    textAlign: "center",
    position: "relative",
    marginTop: 10,
    width: w,
    height: h
  }
};

const Metric = ({ center, value }: { center: number[], value: number }) => {
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
      {value}%
    </text>
  );
};

export default function RadialBarChart({ aliveCount, gpuCount }: RadialBarChartProps) {
  let DTI = 0;
  if (aliveCount > 0) {
    DTI = parseFloat(((gpuCount / aliveCount) * 100).toFixed(2));
    console.log(DTI)
  }

  return (
    <div className="App">
      <div style={styles.root}>
        <RadialBar
          width={w}
          height={h}
          valueFormat=".0%"
          maxValue={1}
          startAngle={-110}
          endAngle={110}
          cornerRadius={40}
          innerRadius={0.87}
          tracksColor="#6f6f6f"
          colors={[color]}
          data={[
            {
              id: "default",
              data: [{ x: "percentage", y: DTI }]
            }
          ]}
          layers={["tracks", "bars", (props) => Metric({ ...props, value: DTI })]}
        />
      </div>
    </div>
  );
}