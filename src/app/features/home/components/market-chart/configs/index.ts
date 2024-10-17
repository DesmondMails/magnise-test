import { ChartConfiguration } from 'chart.js';

export const lineChartOptionsConfig: ChartConfiguration['options'] = {
  elements: {
    line: {
      tension: 0.5,
    },
  },
  scales: {
    y: {
      position: 'left',
    },
    y1: {
      position: 'right',
      grid: {
        color: 'rgba(255,0,0,0.3)',
      },
      ticks: {
        color: 'red',
      },
    },
  },
};

export const colors = [
  'rgba(75, 192, 192, 1)',
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
];
