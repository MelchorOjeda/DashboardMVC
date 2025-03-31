import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Graficos from './pages/Graficos/Graficos';
import ParcelasEliminadas from './pages/ParcelasEliminadas/ParcelasEliminadas';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/graficos" element={<Graficos />} />
        <Route path="/eliminadas" element={<ParcelasEliminadas />} />

      </Routes>
    </Router>
  );
};

export default App
  