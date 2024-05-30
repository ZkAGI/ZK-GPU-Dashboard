import { RadialBar } from "@nivo/radial-bar";
import { CSSProperties } from 'react'

const color = "#4589FF";
const DTI = 0.95;

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
    marginTop: 10,
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
      {DTI * 100}%
    </text>
  );
};

export default function RadialBarChart() {
  return (
    <div className="App">
      <div  style={styles.root}>
        <RadialBar
          width={w}
          height={h}
        //   margin={m}
          valueFormat={".0%"}
          maxValue={1}
          startAngle={-110}
          endAngle={110}
        //   paddingTop={0}
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
          layers={["tracks", "bars", Metric]}
        />
      </div>
    </div>
  );
}


// import { RadialBar } from "@nivo/radial-bar";
// import { CSSProperties } from 'react';

// const color = "#0088FE";
// const value = 95;
// const w = 200;
// const h = 200;
// const m = 0;

// const styles: { [key: string]: CSSProperties } = {
//   root: {
//     fontFamily: "roboto",
//     borderRadius: 12,
//     color: "#ffffff",
//     textAlign: "center",
//     position: "relative",
//     marginTop: 10,
//     width: w,
//     height: h
//   }
// };

// const Metric = ({ center }: { center: number[] }) => {
//   return (
//     <text
//       x={center[0]}
//       y={center[0]}
//       textAnchor="middle"
//       dominantBaseline="central"
//       style={{ fontSize: 40, fill: "white" }}
//     >
//       {`${value}%`}
//     </text>
//   );
// };

// export default function RadialBarChart() {
//   return (
//     <div className="App">
//       <div style={styles.root}>
//         <RadialBar
//           width={w}
//           height={h}
//         //   margin={m}
//           valueFormat=".0%"
//           maxValue={100}
//           startAngle={-90}
//           endAngle={90}
//           cornerRadius={0}
//           innerRadius={0.8}
//           tracksColor="#333333"
//           colors={[color]}
//           data={[
//             {
//               id: "gauge",
//               data: [
//                 { x: "0%", y: 0 },
//                 { x: "100%", y: 100 },
//                 { x: "Value", y: value }
//               ]
//             }
//           ]}
//           layers={["tracks", "bars", Metric]}
//         />
//       </div>
//     </div>
//   );
// }

// import { ResponsiveRadialBar } from '@nivo/radial-bar'

// export const RadialBarChart = () => (
//   <ResponsiveRadialBar
//     data={[
//       {
//         id: 'progress',
//         data: [
//           {
//             x: '0%',
//             y: 0,
//           },
//           {
//             x: '100%',
//             y: 100,
//           },
//           {
//             x: 'Progress',
//             y: 95,
//           },
//         ],
//       },
//     ]}
//     valueFormat=">-.2f"
//     startAngle={-90}
//     endAngle={90}
//     innerRadius={0.8}
//     radialAxisStart={{ tickSize: 0 }}
//     circularAxisOuter={{ tickSize: 0 }}
//     enableCircularGrid={false}
//     enableCircularMetric={false}
//     enableRadialGrid={true}
//     radialAxisStart={{
//       tickValues: [0, 25, 50, 75, 100],
//       tickPadding: 15,
//       tickRotation: 0,
//       tickSize: 10,
//     }}
//     labelsRadialAxisStart={{
//       linkHorizontalLength: 24,
//       linkHorizontalOffsetX: 0,
//       linkHorizontalOffsetY: 0,
//       linkHorizontalLineHeight: 0,
//       linkHorizontalBorderRadius: 0,
//       fontSize: 14,
//     }}
//     colors={['#0088FE']}
//     borderWidth={2}
//     borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
//    slicesAbsoluteRadiusOffset={0}
//     slicesTruncatedRadiusOffset={4}
//     legends={[]}
//   />
// )