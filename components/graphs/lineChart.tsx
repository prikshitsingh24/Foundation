import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Comparison of Shoes vs Shirts',
    },
  },
};

// Labels for all 12 months
const labels = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Custom data for the datasets (12 months of data)
const dataset1Data = [650, 590, 800, 810, 560, 550, 400, 480, 600, 700, 750, 900];
const dataset2Data = [420, 350, 500, 400, 460, 700, 600, 550, 580, 620, 700, 750];

export const data = {
  labels,
  datasets: [
    {
      label: 'Shirts',
      data: dataset1Data, // Custom data for Dataset 1
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Shoes',
      data: dataset2Data, // Custom data for Dataset 2
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export function LineChart() {
  return <Line options={options} data={data} />;
}
