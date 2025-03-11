// src/pages/Register/Register.tsx

import React from 'react';
import './Register.css';
import FormRegister from '../../components/UI/Register/FormRegister';

const Register: React.FC = () => {
  return (
    <div className="register-container">
      <h1>Crear Cuenta</h1>
      <FormRegister />
    </div>
  );
};

export default Register;
