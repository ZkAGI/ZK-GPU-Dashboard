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

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}`;
};

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const formattedData = data.map(datum => ({
    ...datum,
    time: formatDate(datum.time),
  }));

  const maxY = Math.max(...formattedData.map(datum => datum.value));

  const generateTickValues = (max: number, step: number): number[] => {
    const maxAdjusted = Math.ceil(max / step) * step;
    const values = [];
    for (let i = 0; i <= maxAdjusted; i += step) {
      values.push(i);
    }
    return values;
  };

  const CustomTooltip = ({ id, value, indexValue }: any) => (
    <div style={{ background: 'rgba(0, 0, 0, 0.75)', color: 'white', padding: '9px 12px', borderRadius: '7px' }}>
      <strong>Time: {indexValue}</strong><br />
      GPU Capacity: {Math.floor(value)}
    </div>
  );

  return (
    <ResponsiveBar
      data={formattedData}
      keys={['value']}
      indexBy="time"
      margin={{ top: 50, right: 50, bottom: 50, left: 70 }}
      padding={0.8} 
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
        tickValues: generateTickValues(maxY, 10),
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
      tooltip={CustomTooltip}
    />
  );
};

export default BarChart;
