import React from 'react';
import { ResponsiveBar, BarDatum } from '@nivo/bar';

type CustomBarDatum = BarDatum & { [key: string]: string | number | undefined };

export interface BarData extends CustomBarDatum {
  time: string;
  value: number;
}

interface BarChartProps {
  data: BarData[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const maxY = Math.max(...data.map(datum => datum.value));

  const generateTickValues = (max: number, step: number): number[] => {
    const maxAdjusted = Math.ceil(max / step) * step;
    const values = [];
    for (let i = 0; i <= maxAdjusted; i += step) {
      values.push(i);
    }
    return values;
  };

  return (
    <ResponsiveBar
      data={data}
      keys={['value']}
      indexBy="time"
      margin={{ top: 50, right: 130, bottom: 50, left: 70 }}
      padding={0.7}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors="#FFFFFF"
      borderRadius={5}
      enableGridY={false}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Time',
        legendPosition: 'middle',
        legendOffset: 42,
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'GPU Capacity',
        legendPosition: 'middle',
        legendOffset: -40,
        tickValues: generateTickValues(maxY, 5),
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: 'color',
        modifiers: [['brighter', 1.6]],
      }}
      theme={{
        axis: {
          ticks: {
            line: {
              stroke: '#FFFFFF',
            },
            text: {
              fill: '#FFFFFF',
            },
          },
          legend: {
            text: {
              fill: '#FFFFFF',
            },
          },
        },
      }}
      legends={[]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={(e: any) => `${e.id}: ${e.formattedValue} in time: ${e.indexValue}`}
    />
  );
};

export default BarChart;
