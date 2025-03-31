import React, { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './MapboxMap.css';
import { Parcela } from '../../../../interfaces/SensorData';

interface MapboxMapProps {
  parcelas: Parcela[];
}

const MapboxMap: React.FC<MapboxMapProps> = ({ parcelas }) => {
  const [selectedLocation, setSelectedLocation] = useState<Parcela | null>(null);

  const initialLatitude = parcelas.length ? parseFloat(parcelas[0].latitud) : 21.162421;
  const initialLongitude = parcelas.length ? parseFloat(parcelas[0].longitud) : -86.854338;

  return (
    <div className="mapbox-container">
      <Map
        initialViewState={{
          longitude: initialLongitude,
          latitude: initialLatitude,
          zoom: 13,
        }}
        style={{ width: '100%', height: '100%' }}
        mapboxAccessToken="pk.eyJ1IjoibWVsY2hvci1vamVkYSIsImEiOiJjbTI5MXNnamowMG1sMmtweng0YzVkdGZpIn0.XWCJom5a5r0jeVrCku1QAQ"
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        {parcelas.map((parcela) => (
          <Marker
            key={parcela.id}
            longitude={parseFloat(parcela.longitud)}
            latitude={parseFloat(parcela.latitud)}
            anchor="bottom"
            onClick={() => setSelectedLocation(parcela)}
          >
            <svg
              height="34"
              viewBox="0 0 24 24"
              style={{
                cursor: 'pointer',
                fill: '#ff5722',
                stroke: 'none',
                transform: 'translate(-12px, -24px)',
              }}
            >
              <path d="M12 0C7.03 0 3 4.03 3 9c0 7.2 9 15 9 15s9-7.8 9-15c0-4.97-4.03-9-9-9zm0 12.3c-1.82 0-3.3-1.48-3.3-3.3S10.18 5.7 12 5.7s3.3 1.48 3.3 3.3-1.48 3.3-3.3 3.3z"/>
            </svg>
          </Marker>
        ))}

        {selectedLocation && selectedLocation.sensorParcelas && selectedLocation.sensorParcelas.length > 0 && (
          <Popup
            longitude={parseFloat(selectedLocation.longitud)}
            latitude={parseFloat(selectedLocation.latitud)}
            anchor="top"
            closeOnClick={false}
            onClose={() => setSelectedLocation(null)}
          >
            <div style={{ color: '#000' }}>
              <strong>{selectedLocation.nombre}</strong><br />
              Responsable: {selectedLocation.responsable}<br />
              Cultivo: {selectedLocation.tipo_cultivo}<br />
              Último Riego: {new Date(selectedLocation.ultimo_riego).toLocaleString()}<br />
              <strong>Sensor (último registro):</strong><br />
              🌡️ Temp: {selectedLocation.sensorParcelas[selectedLocation.sensorParcelas.length - 1].temperatura}°C<br />
              💧 Humedad: {selectedLocation.sensorParcelas[selectedLocation.sensorParcelas.length - 1].humedad}%<br />
              🌧️ Lluvia: {selectedLocation.sensorParcelas[selectedLocation.sensorParcelas.length - 1].lluvia}mm<br />
              ☀️ Sol: {selectedLocation.sensorParcelas[selectedLocation.sensorParcelas.length - 1].sol}%
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default MapboxMap;
