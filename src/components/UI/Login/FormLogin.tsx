import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../index';
import './FormLogin.css';

const FormLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setErrorMessage('Por favor ingresa un email válido');
      return;
    }
    if (password.length < 8) {
      setErrorMessage('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="form-login">
      <h2>Iniciar Sesión</h2>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <Input
        label="Email:"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="correo@ejemplo.com"
        />

        <Input
        label="Contraseña:"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="********"
        />


      <Button
        className="login-button"
        label="Ingresar"
        type="submit"
      />
    </form>
  );
};

export default FormLogin;
