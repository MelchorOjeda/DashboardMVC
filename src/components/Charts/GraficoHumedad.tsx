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

    const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Temperatura',
        color: '#fff', // Título en blanco
        font: {
          size: 18, // Tamaño de fuente más grande
          weight: 'bold',
        },
      },
      legend: {
        labels: {
          color: '#fff', // Color de las etiquetas de la leyenda
          font: {
            size: 14,
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#fff', // Texto en eje X en blanco
          font: {
            size: 12,
          },
        },
      },
      y: {
        ticks: {
          color: '#fff', // Texto en eje Y en blanco
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return <Radar data={chartData} options={{ responsive: true, plugins: { title: { display: true, text: 'Humedad en el aire', color: '#fff' } } }} />;
};

export default GraficoHumedad;
