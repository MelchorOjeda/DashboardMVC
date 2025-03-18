import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/UI/Dashboard/Sidebar/Sidebar';
import MapboxMap from '../../components/UI/Dashboard/Map/MapboxMap';
import InfoCard from '../../components/UI/Dashboard/Cards/InfoCard';
import Footer from '../../components/UI/Footer/Footer';
import { obtenerDatosSensores } from '../../services/sensorService';
import { ApiResponse } from '../../interfaces/SensorData';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [data, setData] = React.useState<ApiResponse | null>(null);

  React.useEffect(() => {
    obtenerDatosSensores()
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return <div className="loading">Cargando datos IoT...</div>;

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="dashboard-main-content">
        <h1>Cultivos del Sur | Mapa de Ubicaciones</h1>

        <div className="dashboard-map-cards">
          <MapboxMap parcelas={data.parcelas} />

          <div className="cards-grid">
            <InfoCard title="Temperatura" value={`${data.sensores.temperatura} °C`} />
            <InfoCard title="Humedad" value={`${data.sensores.humedad}%`} />
            <InfoCard title="Lluvia" value={`${data.sensores.lluvia} mm`} />
            <InfoCard title="Intensidad del Sol" value={`${data.sensores.sol}%`} />
          </div>
          <Footer />
        </div>

      </main>


    </div>
  );
};

export default Dashboard;
