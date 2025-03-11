// src/components/UI/FormRegister.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../index';
import './FormRegister.css';

interface FormRegisterProps {
}

const FormRegister: React.FC<FormRegisterProps> = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.length > 50) {
      setErrorMessage('El nombre no puede exceder 50 caracteres');
      return;
    }
    if (lastName.length > 50) {
      setErrorMessage('Los apellidos no pueden exceder 50 caracteres');
      return;
    }
    if (phone.length > 14) {
      setErrorMessage('El número de teléfono no puede exceder 14 dígitos');
      return;
    }
    if (!/^\d+$/.test(phone)) {
        setErrorMessage('El teléfono debe contener solo dígitos');
        return;
    }

    if (!email.includes('@')) {
      setErrorMessage('Ingresa un correo válido (debe contener @)');
      return;
    }
    if (password.length < 8) {
      setErrorMessage('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

    const newUser = {
      name,
      lastName,
      phone,
      email,
      password,
    };

    existingUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="form-register">
      <h2>Registro de Usuario</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <Input
        label="Nombre:"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tu nombre"
      />

      <Input
        label="Apellido(s):"
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Tus apellidos"
      />

      <Input
        label="Teléfono:"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Ej. 5551234567"
        maxLength={14}  
      />

      <Input
        label="Correo:"
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
        label="Registrarse"
        type="submit"
      />
    </form>
  );
};

export default FormRegister;
