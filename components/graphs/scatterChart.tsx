import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

// Custom data for scatter plot (100 points with custom x, y values)
const scatterData = Array.from({ length: 100 }, (_, index) => ({
  x: Math.random() * 200 - 100,  // Random x value between -100 and 100
  y: Math.random() * 200 - 100,  // Random y value between -100 and 100
}));

export const data = {
  datasets: [
    {
      label: 'Customer Age',
      data: scatterData, // Use custom scatter data
      backgroundColor: 'rgba(255, 99, 132, 1)',
    },
  ],
};

export function ScatterChart() {
  return <Scatter options={options} data={data} />;
}
