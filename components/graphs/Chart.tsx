// import React from 'react';

// interface ChartProps {
//   value: number;
//   backgroundColor?: string;
//   foregroundColor?: string;
//   textColor?: string;
//   fontSize?: number;
// }

// const Chart: React.FC<ChartProps> = ({
//   value,
//   backgroundColor = '#000000',
//   foregroundColor = '#0088FE',
//   textColor = '#FFFFFF',
//   fontSize = 16,
// }) => {
//   const radius = 90;
//   const circumference = 2 * Math.PI * radius;
//   const dashArray = `${circumference} ${circumference}`;
//   const dashOffset = circumference - (value / 100) * circumference;

//   return (
//     <div style={{ position: 'relative', width: '200px', height: '200px' }}>
//       <svg width="200" height="200">
//         <circle
//           cx="100"
//           cy="100"
//           r={radius}
//           fill="transparent"
//           stroke={backgroundColor}
//           strokeWidth="20"
//         />
//         <circle
//           cx="100"
//           cy="100"
//           r={radius}
//           fill="transparent"
//           stroke={foregroundColor}
//           strokeWidth="20"
//           strokeDasharray={dashArray}
//           strokeDashoffset={dashOffset}
//           transform="rotate(-90 100 100)"
//           style={{ transition: 'stroke-dashoffset 0.3s ease-in-out' }}
//         />
//         <text
//           x="50%"
//           y="50%"
//           textAnchor="middle"
//           alignmentBaseline="central"
//           fill={textColor}
//           fontSize={fontSize}
//         >
//           {`${value}%`}
//         </text>
//       </svg>
//       <div style={{ position: 'absolute', bottom: 0, left: 0, fontSize: 12 }}>
//         0%
//       </div>
//       <div style={{ position: 'absolute', bottom: 0, right: 0, fontSize: 12 }}>
//         100%
//       </div>
//     </div>
//   );
// };

// export default Chart;


// import React, { useRef, useEffect } from 'react';

// interface GaugeProps {
//     percentage: number;
// }

// export const CustomGauge: React.FC<GaugeProps> = ({ percentage }) => {
//     const canvasRef = useRef<HTMLCanvasElement>(null);

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;
//         const ctx = canvas.getContext('2d');
//         if (!ctx) return;

//         const width = canvas.width;
//         const height = canvas.height;
//         const centerX = width / 2;
//         const centerY = height / 2;
//         const radius = Math.min(width, height) / 2 - 20;
//         const startAngle = 0.75 * Math.PI;
//         const endAngle = 2.25 * Math.PI;
//         const percentageAngle = startAngle + (percentage / 100) * 1.5 * Math.PI;

//         // Clear canvas
//         ctx.clearRect(0, 0, width, height);

//         // Draw background arc
//         ctx.beginPath();
//         ctx.arc(centerX, centerY, radius, startAngle, endAngle);
//         ctx.lineWidth = 20;
//         ctx.strokeStyle = '#1e293b';
//         ctx.stroke();

//         // Draw foreground arc
//         ctx.beginPath();
//         ctx.arc(centerX, centerY, radius, startAngle, percentageAngle);
//         ctx.lineWidth = 20;
//         ctx.strokeStyle = '#2563eb';
//         ctx.stroke();

//         // Draw percentage text
//         ctx.fillStyle = '#ffffff';
//         ctx.font = '48px Arial';
//         ctx.textAlign = 'center';
//         ctx.textBaseline = 'middle';
//         ctx.fillText(`${percentage}%`, centerX, centerY);
//     }, [percentage]);

//     return (
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#0b1120' }}>
//             <canvas ref={canvasRef} width={300} height={300}></canvas>
//         </div>
//     );
// };

import React, { useRef, useEffect } from 'react';

interface GaugeProps {
    percentage: number;
}

export const CustomGauge: React.FC<GaugeProps> = ({ percentage }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 2 - 20;
        const startAngle = 0.75 * Math.PI;
        const endAngle = 2.25 * Math.PI;
        const percentageAngle = startAngle + (percentage / 100) * 1.5 * Math.PI;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Draw background arc
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.lineWidth = 20;
        ctx.lineCap = 'round'; // Make corners smooth
        ctx.strokeStyle = '#1e293b';
        ctx.stroke();

        // Draw foreground arc
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, percentageAngle);
        ctx.lineWidth = 20;
        ctx.lineCap = 'round'; // Make corners smooth
        ctx.strokeStyle = '#2563eb';
        ctx.stroke();

        // Draw percentage text
        ctx.fillStyle = '#ffffff';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${percentage}%`, centerX, centerY);

        // Draw 0% text
        ctx.fillStyle = '#ffffff';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('0%', centerX - radius * Math.cos(0.75 * Math.PI), centerY - radius * Math.sin(0.75 * Math.PI));

        // Draw 100% text
        ctx.fillStyle = '#ffffff';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('100%', centerX + radius * Math.cos(2.25 * Math.PI), centerY - radius * Math.sin(2.25 * Math.PI));
    }, [percentage]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#0b1120' }}>
            <canvas ref={canvasRef} width={300} height={300}></canvas>
        </div>
    );
};
