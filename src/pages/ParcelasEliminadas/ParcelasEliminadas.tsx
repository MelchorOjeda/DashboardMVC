import React, { useEffect, useState } from 'react';
import { obtenerParcelasInactivas } from '../../services/sensorService';
import { Parcela } from '../../interfaces/SensorData';
import Sidebar from '../../components/UI/Dashboard/Sidebar/Sidebar';
import './ParcelasEliminadas.css';

const ParcelasEliminadas: React.FC = () => {
  const [parcelas, setParcelas] = useState<Parcela[]>([]);

  useEffect(() => {
    obtenerParcelasInactivas().then(setParcelas);
  }, []);

  return (
    <div className="eliminadas-dashboard">
      <Sidebar />
      <main className="eliminadas-container">
        <h1>Parcelas Eliminadas</h1>
        {parcelas.length === 0 ? (
          <p>No hay parcelas eliminadas.</p>
        ) : (
          <div className="eliminadas-grid">
            {parcelas.map((parcela) => (
              <div key={parcela.id} className="parcela-card">
                <h2>{parcela.nombre}</h2>
                <p><strong>Ubicación:</strong> {parcela.ubicacion}</p>
                <p><strong>Responsable:</strong> {parcela.responsable}</p>
                <p><strong>Cultivo:</strong> {parcela.tipo_cultivo}</p>
                <p><strong>Último Riego:</strong> {new Date(parcela.ultimo_riego).toLocaleString()}</p>
                <p><strong>Latitud:</strong> {parcela.latitud}</p>
                <p><strong>Longitud:</strong> {parcela.longitud}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ParcelasEliminadas;
