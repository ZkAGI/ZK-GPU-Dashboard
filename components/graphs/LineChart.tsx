import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import useSWR from 'swr';

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
  console.log('datalien',data)
  const maxY = Math.max(...data.flatMap(series => series.data.map(datum => datum.y)));

  const generateTickValues = (max: number, step: number): number[] => {
    const values = [];
    const maxAdjusted = Math.ceil(max / step) * step;
    for (let i = 0; i <= maxAdjusted; i += step) {
      values.push(i);
    }
    return values;
  };

  return (
    <ResponsiveLine
      data={data}
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
    />
  );
};

export default LineChart;