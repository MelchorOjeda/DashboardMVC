import React from 'react';
import './Card.css';

interface CardProps {
  title: string;
  value: string | number;
  info?: string; 
}

const Card: React.FC<CardProps> = ({ title, value, info }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p className="card-value">{value}</p>
      {info && <p className="card-info">{info}</p>}
    </div>
  );
};

export default Card;
