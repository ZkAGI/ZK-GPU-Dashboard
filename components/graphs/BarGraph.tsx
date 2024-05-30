import React from 'react';
import { ResponsiveBar, BarDatum } from '@nivo/bar';
 import { BarData } from './types';
 import { linearGradientDef } from '@nivo/core'

interface BarChartProps {
  data: BarData[];
}


const BarChart: React.FC<BarChartProps> = ({ data }) => (
  <ResponsiveBar
    data={data}
    keys={['value']}
    indexBy="time"
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.9}
    valueScale={{ type: 'linear' }}
    indexScale={{ type: 'band', round: true }}
    colors="#FFFFFF"
    borderRadius={5}
    enableGridY={false}
    // defs={[
    //   {
    //     id: 'gradientA',
    //     type: 'linearGradient',
    //     colors: [
    //       { offset: 0, color: '#0075FF' },
    //       { offset: 100, color: '#0075FF' },
    //     ],
    //   },
    // //   linearGradientDef('gradientA', [
    // //     { offset: 0, color: 'inherit' },
    // //     { offset: 100, color: 'inherit', opacity: 0 },
    // // ]),
    // ]}
    // fill={[
    //   { match: '*', id: 'gradientA' },
    // ]}
    axisTop={null}
    axisRight={null}
    axisBottom={{
       tickSize: 0,
       tickPadding: 5,
       tickRotation: 0,
      legend: 'Time',
      legendPosition: 'middle',
      legendOffset: 42
    }}
    axisLeft={{
       tickSize: 0,
       tickPadding: 5,
       tickRotation: 0,
      legend: 'GPU Capacity',
      legendPosition: 'middle',
      legendOffset: -40
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{
      from: 'color',
      modifiers: [
        [
          'brighter',
          1.6
        ]
      ]
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
    barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
  />
);

export default BarChart;