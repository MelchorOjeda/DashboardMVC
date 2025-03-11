import React from 'react';
import './Dashboard.css';
import Sidebar from '../../components/UI/Dashboard/Sidebar';
import Card from '../../components/UI/Dashboard/Card';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      
      <div className="dashboard-content">
        <h1>Panel de Control IoT</h1>

        <div className="cards-container">
          <Card title="Dispositivos" value={12} info="Total de dispositivos conectados" />
          <Card title="Sensores Activos" value={8} info="Sensores enviando datos en tiempo real" />
          <Card title="Alertas" value={2} info="Alertas pendientes" />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
