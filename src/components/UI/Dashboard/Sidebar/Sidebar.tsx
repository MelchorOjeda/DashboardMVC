import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState('dashboard');

  const handleNavigate = (route: string) => {
    setActive(route);
    navigate(`/${route}`);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>Mi IoT</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li
            className={active === 'dashboard' ? 'active' : ''}
            onClick={() => handleNavigate('dashboard')}
          >
            Dashboard
          </li>
          <li
            className={active === 'graficos' ? 'active' : ''}
            onClick={() => handleNavigate('graficos')}
          >
            Gráficas
          </li>
          <li
            className={active === 'eliminadas' ? 'active' : ''}
            onClick={() => handleNavigate('eliminadas')}
          >
            Parcelas Eliminadas
          </li>
          <li
            className={active === 'salir' ? 'active' : ''}
            onClick={() => {
              setActive('salir');
              navigate('/');
              localStorage.removeItem('isLoggedIn');
            }}
          >
            Salir
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
