import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';

const GraficoLluvia = ({ labels, data }: { labels: string[]; data: number[] }) => {
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy(); 
      }
    };
  }, []);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Lluvia (mm)',
        data,
        borderColor: '#4FC3F7',
        backgroundColor: '#4FC3F7',
        tension: 0.4,
      },
    ],
  };

  return <Line ref={chartRef as React.MutableRefObject<any>} data={chartData} options={{ responsive: true, plugins: { title: { display: true, text: 'Lluvia', color: '#fff' } } }} />;
};

export default GraficoLluvia;
