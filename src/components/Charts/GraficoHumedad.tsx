import { Chart } from 'chart.js';
import { useEffect, useRef } from 'react';
import { Radar } from 'react-chartjs-2';

const GraficoHumedad = ({ labels, data }: { labels: string[]; data: number[] }) => {
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
        label: 'Humedad (%)',
        data,
        backgroundColor: 'rgba(103,58,183,0.4)',
        borderColor: '#673AB7',
        borderWidth: 2,
      },
    ],
  };

  return <Radar data={chartData} options={{ responsive: true, plugins: { title: { display: true, text: 'Humedad', color: '#fff' } } }} />;
};

export default GraficoHumedad;
