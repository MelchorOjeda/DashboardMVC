import { Chart } from 'chart.js';
import { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';

const GraficoSol = ({ labels, data }: { labels: string[]; data: number[] }) => {
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
        label: 'Sol (%)',
        data,
        borderColor: '#FFD54F',
        backgroundColor: '#FFD54F',
        tension: 0.4,
      },
    ],
  };

  return <Line data={chartData} options={{ responsive: true, plugins: { title: { display: true, text: 'Sol', color: '#fff' } } }} />;
};

export default GraficoSol;
