// import React from 'react';
// import { ResponsiveLine } from '@nivo/line';
// import { LineData } from './types';

// interface LineChartProps {
//   data: LineData[];
// }

// const LineChart: React.FC<LineChartProps> = ({ data }) => (
//   <ResponsiveLine
//     data={data}
//     margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
//     xScale={{ type: 'point' }}
//     yScale={{
//       type: 'linear',
//       min: 'auto',
//       max: 'auto',
//       stacked: true,
//       reverse: false
//     }}
//     yFormat=" >-.2f"
//     axisTop={null}
//     axisRight={null}
//     axisBottom={{
//       orient: 'bottom',
//       tickSize: 5,
//       tickPadding: 5,
//       tickRotation: 0,
//       legend: 'Time',
//       legendOffset: 36,
//       legendPosition: 'middle'
//     }}
//     axisLeft={{
//       orient: 'left',
//       tickSize: 5,
//       tickPadding: 5,
//       tickRotation: 0,
//       legend: 'GPU Nodes',
//       legendOffset: -40,
//       legendPosition: 'middle'
//     }}
//     pointSize={10}
//     pointColor={{ theme: 'background' }}
//     pointBorderWidth={2}
//     pointBorderColor={{ from: 'serieColor' }}
//     pointLabelYOffset={-12}
//     useMesh={true}
//     legends={[]}
//   />
// );

// export default LineChart;

// import React from 'react';
// import { ResponsiveLine } from '@nivo/line';

// // Define the data type for each point in the line chart
// export interface LineDatum {
//   x: string;
//   y: number;
// }

// // Define the data type for each series in the line chart
// export interface LineData {
//   id: string;
//   data: LineDatum[];
// }

// interface LineChartProps {
//   data: LineData[];
// }

// const LineChart: React.FC<LineChartProps> = ({ data }) => {
//     const maxY = Math.max(...data.flatMap(series => series.data.map(datum => datum.y)));
  
//   // Generate y-axis tick values dynamically based on the max y value
//   const generateTickValues = (max:number, step:number):number[] => {
//     const values = [];
//     for (let i = 0; i <= max; i += step) {
//       values.push(i);
//     }
//     return values;
//   };

//   return(
//   <ResponsiveLine
//     data={data}
//     margin={{ top: 30, right: 100, bottom: 50, left: 60 }}
//     colors="#0075FF"
//     xScale={{ type: 'point' }}
//     yScale={{
//       type: 'linear',
//       min: 0,
//       max: 'auto',
//       stacked: true,
//       reverse: false
//     }}
//     // yFormat=" >-.2f"
//     // xFormat=" <-.2f"
//     curve='basis'
//     enablePoints={false}
//     enableGridX={false}
//     axisTop={null}
//     axisRight={null}
//     axisBottom={{
//       tickSize: 0,
//       tickPadding: 18,
//       tickRotation: 0,
//       legend: 'Time',
//       legendOffset: 40,
//       legendPosition: 'middle'
//     }}
//     axisLeft={{
//       tickSize: 0,
//       tickPadding: 10,
//       tickRotation: 0,
//       legend: 'GPU Nodes',
//       legendOffset: -40,
//       legendPosition: 'middle',
//       tickValues: generateTickValues(maxY, 5)
//     }}
//     theme={{
//         axis: {
//           ticks: {
//             line: {
//               stroke: '#FFFFFF', 
//             },
//             text: {
//               fill: '#FFFFFF', 
//             },
//           },
//           legend: {
//             text: {
//               fill: '#FFFFFF', 
//             },
//           },
//         },
//       }}
//     pointSize={10}
//     pointColor={{ theme: 'background' }}
//     pointBorderWidth={2}
//     pointBorderColor={{ from: 'serieColor' }}
//     pointLabelYOffset={-12}
//     useMesh={true}
//     legends={[]}
//   />
//     );
// };

// export default LineChart;


import React from 'react';
import { ResponsiveLine } from '@nivo/line';

export interface LineDatum {
  x: string;
  y: number;
}

export interface LineData {
  id: string;
  data: LineDatum[];
}

interface LineChartProps {
  data: LineData[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const maxY = Math.max(...data.flatMap(series => series.data.map(datum => datum.y)));

  const generateTickValues = (max: number, step: number): number[] => {
    const values = [];
    for (let i = 0; i <= max; i += step) {
      values.push(i);
    }
    return values;
  };

  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 30, right: 100, bottom: 50, left: 60 }}
      colors="#0075FF"
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 0,
        max: 'auto',
        stacked: true,
        reverse: false,
      }}
      curve="basis"
      enablePoints={false}
      enableGridX={false}
      enableGridY={false}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 0,
        tickPadding: 18,
        tickRotation: 0,
        legend: 'Time',
        legendOffset: 40,
        legendPosition: 'middle',
      }}
      axisLeft={{
        tickSize: 0, 
        tickPadding: 10,
        tickRotation: 0,
        legend: 'GPU Nodes',
        legendOffset: -40,
        legendPosition: 'middle',
        tickValues: generateTickValues(maxY, 5),
      }}
      theme={{
        axis: {
          ticks: {
            line: {
            stroke: '#8884d8', 
            strokeDasharray: '4 4', 
            strokeOpacity: 0.5,
            },
            text: {
              fill: '#FFFFFF',
              fontFamily: 'TT Firs Neue', // Set the font family
            },
          },
          legend: {
            text: {
              fill: '#FFFFFF',
              fontFamily: 'TT Firs Neue', // Set the font family
            },
          },
        },
      }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[]}
      enableArea={true} // Enable area under the line
      areaBaselineValue={0} // Set the baseline value for the area
      areaOpacity={0.2} // Set the opacity for the area
      areaBlendMode="lighten" // Set the blend mode for the area
      defs={[
        {
          id: 'gradientArea',
          type: 'linearGradient',
          colors: [
            { offset: 0, color: '#0075FF' },
            { offset: 100, color: '#0000FF' },
          ],
        },
      ]}
      fill={[
        {
          match: {
            id: 'area',
          },
          id: 'gradientArea',
        },
      ]}
    />
  );
};

export default LineChart;