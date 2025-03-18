import React, { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './MapboxMap.css';
import { Parcela } from '../../../../interfaces/SensorData';

interface MapboxMapProps {
  parcelas: Parcela[];
}

const MapboxMap: React.FC<MapboxMapProps> = ({ parcelas }) => {
  const [selectedParcela, setSelectedParcela] = useState<Parcela | null>(null);

  return (
    <div className="mapbox-container">
      <Map
        initialViewState={{
          longitude: parcelas[0].longitud,
          latitude: parcelas[0].latitud,
          zoom: 13,
        }}
        style={{ width: '100%', height: '100%' }}
        mapboxAccessToken="pk.eyJ1IjoibWVsY2hvci1vamVkYSIsImEiOiJjbTI5MXNnamowMG1sMmtweng0YzVkdGZpIn0.XWCJom5a5r0jeVrCku1QAQ"
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        {parcelas.map(parcela => (
          <Marker
            key={parcela.id}
            longitude={parcela.longitud}
            latitude={parcela.latitud}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelectedParcela(parcela);
            }}
          >
            <svg height="34" viewBox="0 0 24 24" style={{ cursor: 'pointer', fill: '#ff5722', stroke: 'none', transform: 'translate(-12px, -24px)' }}>
              <path d="M12 0C7.03 0 3 4.03 3 9c0 7.2 9 15 9 15s9-7.8 9-15c0-4.97-4.03-9-9-9zm0 12.3c-1.82 0-3.3-1.48-3.3-3.3S10.18 5.7 12 5.7s3.3 1.48 3.3 3.3-1.48 3.3-3.3 3.3z"/>
            </svg>
          </Marker>
        ))}

        {selectedParcela && (
          <Popup
            longitude={selectedParcela.longitud}
            latitude={selectedParcela.latitud}
            anchor="top"
            closeOnClick={false}
            onClose={() => setSelectedParcela(null)}
          >
            <div style={{ color: 'black' }}>
              <strong>{selectedParcela.nombre}</strong><br/>
              Responsable: {selectedParcela.responsable}<br/>
              Cultivo: {selectedParcela.tipo_cultivo}<br/>
              Último Riego: {selectedParcela.ultimo_riego}
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default MapboxMap;
