import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../services/usuarioService';
import Input from '../Input';
import './FormRegister.css';

const securityQuestions = [
  '¿Cuál es el nombre de tu primera mascota?',
  '¿Cuál es tu comida favorita?',
  '¿En qué ciudad naciste?',
  '¿Cuál es el nombre de tu mejor amigo de la infancia?',
  '¿Cuál es tu película favorita?',
];

const FormRegister: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [question, setQuestion] = useState<string>(securityQuestions[0]);
  const [answer, setAnswer] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.includes('@')) {
      setErrorMessage('Ingresa un correo válido (debe contener @)');
      return;
    }

    if (password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password) || !/[@$!%*?&]/.test(password)) {
      setErrorMessage('La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo');
      return;
    }

    try {
      const newUser = {
        correo: email,
        contra: password,
        pregunta: question,
        respuesta: answer,
        nombre: name,
        telefono: phone,
      };

      await registerUser(newUser);
      navigate('/');
    } catch (error: any) {
      setErrorMessage(error?.response?.data?.message || 'Error al registrar el usuario');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-register">
      <h2>Registro de Usuario</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="form-group">
        <Input label="Nombre:" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="form-group">
        <Input label="Teléfono:" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div className="form-group">
        <Input label="Correo:" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Pregunta de Seguridad:</label>
        <select value={question} onChange={(e) => setQuestion(e.target.value)}>
          {securityQuestions.map((q, index) => (
            <option key={index} value={q}>
              {q}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <Input label="Respuesta:" type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
      </div>
      <div className="form-group">
        <Input label="Contraseña:" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Registrar</button>
    </form>
  );
};

export default FormRegister;
