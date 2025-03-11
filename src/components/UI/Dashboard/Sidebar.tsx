import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <h2>My IoT</h2>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/sensors">Sensores</Link>
          </li>
          <li>
            <Link to="/settings">Configuración</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
