import React from 'react';
import './InfoCard.css';

interface InfoCardProps {
  title: string;
  value: string | number;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, value }) => {
  return (
    <div className="info-card">
      <span className="card-title">{title}</span>
      <span className="card-value">{value}</span>
    </div>
  );
};

export default InfoCard;
