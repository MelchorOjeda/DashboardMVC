
import React from 'react';
import { Link } from 'react-router-dom';
import FormLogin from '../../components/UI/Login/FormLogin';
import './Login.css';
// import iotLoginImage from '../../assets/iot-login.png'; 

const Login: React.FC = () => {
  return (
    <div className="login-wrapper">
      <div className="login-card">
        {/* <div className="login-image">
          <img src={iotLoginImage} alt="IoT login illustration" />
        </div> */}
        
        <FormLogin />

        <div className="register-link">
          <p>
            ¿No tienes cuenta?&nbsp;
            <Link to="/register">Regístrate</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
