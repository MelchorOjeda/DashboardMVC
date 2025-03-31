import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 🔥 Detecta la ruta actual

  const handleLogout = () => {
    const confirmLogout = window.confirm('¿Estás seguro de que deseas cerrar sesión?'); // 🔥 Muestra mensaje de confirmación
    if (confirmLogout) {
      localStorage.removeItem('isLoggedIn'); // Elimina el estado de sesión
      localStorage.removeItem('token'); // 🔥 Elimina el token de autenticación
      navigate('/'); // Redirige a la página de inicio
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>Mi IoT</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li
            className={location.pathname === '/dashboard' ? 'active' : ''}
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </li>
          <li
            className={location.pathname === '/graficos' ? 'active' : ''}
            onClick={() => navigate('/graficos')}
          >
            Gráficas
          </li>
          <li
            className={location.pathname === '/eliminadas' ? 'active' : ''}
            onClick={() => navigate('/eliminadas')}
          >
            Parcelas Eliminadas
          </li>
          <li onClick={handleLogout}>Salir</li> {/* 🔥 Llama a la función de logout */}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
