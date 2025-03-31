import { Chart } from 'chart.js';
import { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';

const GraficoTemperatura = ({ labels, data }: { labels: string[]; data: number[] }) => {
      const chartRef = useRef<Chart | null>(null);
      
        useEffect(() => {
          return () => {
            if (chartRef.current) {
              chartRef.current.destroy(); // 🔥 Destruye el gráfico al desmontar
            }
          };
        }, []);
        
  
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Temperatura (°C)',
        data,
        backgroundColor: '#1fb47b',
      },
    ],
  };

  return <Bar data={chartData} options={{ responsive: true, plugins: { title: { display: true, text: 'Temperatura en el ambiente', color: '#fff' } } }} />;
};

export default GraficoTemperatura;
