// import React from 'react';
// import { ResponsiveLine, Serie } from '@nivo/line';

// export interface LineDatum {
//   x: string;
//   y: number;
// }

// export interface LineData extends Serie {
//   id: string;
//   data: LineDatum[];
// }

// interface LineChartProps {
//   data: LineData[];
// }

// const LineChart: React.FC<LineChartProps> = ({ data }) => {
//   const maxY = Math.max(...data.flatMap(series => series.data.map(datum => datum.y)));

//   const generateTickValues = (max: number, step: number): number[] => {
//     const values = [];
//     const maxAdjusted = Math.ceil(max / step) * step;
//     for (let i = 0; i <= maxAdjusted; i += step) {
//       values.push(i);
//     }
//     return values;
//   };

//   const CustomTooltip = ({ point }: any) => (
//     <div style={{ background: 'rgba(0, 0, 0, 0.75)', color: 'white', padding: '9px 12px', borderRadius: '7px' }}>
//       <strong>Date: {point.data.xFormatted}</strong><br />
//       Nodes: {point.data.yFormatted}
//     </div>
//   );

//   return (
//     <ResponsiveLine
//       data={data}
//       margin={{ top: 30, right: 60, bottom: 50, left: 60 }}
//       colors="#0075FF"
//       xScale={{ type: 'point' }}
//       yScale={{
//         type: 'linear',
//         min: 0,
//         max: 'auto',
//         stacked: true,
//         reverse: false,
//       }}
//       curve="basis"
//       enablePoints={false}
//       enableGridX={false}
//       enableGridY={false}
//       axisTop={null}
//       axisRight={null}
//       axisBottom={{
//         tickSize: 0,
//         tickPadding: 18,
//         tickRotation: 0,
//         legend: 'Time',
//         legendOffset: 40,
//         legendPosition: 'middle',
//       }}
//       axisLeft={{
//         tickSize: 0,
//         tickPadding: 10,
//         tickRotation: 0,
//         legend: 'GPU Nodes',
//         legendOffset: -40,
//         legendPosition: 'middle',
//         tickValues: generateTickValues(maxY, 1),
//       }}
//       theme={{
//         axis: {
//           ticks: {
//             line: {
//               stroke: '#8884d8',
//               strokeDasharray: '4 4',
//               strokeOpacity: 0.5,
//             },
//             text: {
//               fill: '#FFFFFF',
//               fontFamily: 'TT Firs Neue',
//             },
//           },
//           legend: {
//             text: {
//               fill: '#FFFFFF',
//               fontFamily: 'TT Firs Neue',
//             },
//           },
//         },
//         tooltip: {
//           container: {
//             background: 'rgba(0, 0, 0, 0.75)',
//             color: 'white',
//             fontSize: '14px',
//             borderRadius: '4px',
//             boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15)',
//           },
//         },
//       }}
//       pointSize={10}
//       pointColor={{ theme: 'background' }}
//       pointBorderWidth={2}
//       pointBorderColor={{ from: 'serieColor' }}
//       pointLabelYOffset={-12}
//       useMesh={true}
//       legends={[]}
//       enableArea={true}
//       areaBaselineValue={0}
//       areaOpacity={0.2}
//       areaBlendMode="lighten"
//       defs={[
//         {
//           id: 'gradientArea',
//           type: 'linearGradient',
//           colors: [
//             { offset: 0, color: '#0075FF' },
//             { offset: 100, color: '#0000FF' },
//           ],
//         },
//       ]}
//       fill={[
//         {
//           match: {
//             id: 'area',
//           },
//           id: 'gradientArea',
//         },
//       ]}
//       tooltip={CustomTooltip}
//     />
//   );
// };

// export default LineChart;


import React from 'react';
import { ResponsiveLine, Serie } from '@nivo/line';

export interface LineDatum {
  x: string;
  y: number;
}

export interface LineData extends Serie {
  id: string;
  data: LineDatum[];
}

interface LineChartProps {
  data: LineData[];
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}`;
};

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const formattedData = data.map(series => ({
    ...series,
    data: series.data.map(datum => ({
      ...datum,
      x: formatDate(datum.x),
    })),
  }));

  const maxY = Math.max(...formattedData.flatMap(series => series.data.map(datum => datum.y)));

  const generateTickValues = (max: number, step: number): number[] => {
    const values = [];
    const maxAdjusted = Math.ceil(max / step) * step;
    for (let i = 0; i <= maxAdjusted; i += step) {
      values.push(i);
    }
    return values;
  };

  const CustomTooltip = ({ point }: any) => (
    <div style={{ background: 'rgba(0, 0, 0, 0.75)', color: 'white', padding: '9px 12px', borderRadius: '7px' }}>
      <strong>Date: {point.data.xFormatted}</strong><br />
      Nodes: {point.data.yFormatted}
    </div>
  );

  return (
    <ResponsiveLine
      data={formattedData}
      margin={{ top: 30, right: 60, bottom: 50, left: 60 }}
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
        tickValues: generateTickValues(maxY, 1),
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
              fontFamily: 'TT Firs Neue',
            },
          },
          legend: {
            text: {
              fill: '#FFFFFF',
              fontFamily: 'TT Firs Neue',
            },
          },
        },
        tooltip: {
          container: {
            background: 'rgba(0, 0, 0, 0.75)',
            color: 'white',
            fontSize: '14px',
            borderRadius: '4px',
            boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15)',
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
      enableArea={true}
      areaBaselineValue={0}
      areaOpacity={0.2}
      areaBlendMode="lighten"
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
      tooltip={CustomTooltip}
    />
  );
};

export default LineChart;
