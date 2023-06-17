import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import "./static/templates/login.css"

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://192.168.1.27:3000/api/login', {
        username,
        password,
      });

      // Si la respuesta del servidor es exitosa, puedes realizar alguna acción, como redireccionar a otra página
      console.log('Inicio de sesión exitoso');
      console.log('Token de acceso:', response.data.accessToken);
      navigate('/lista');
    } catch (error) {
      // Si hay un error en la respuesta del servidor, muestra el mensaje de error
      console.error('Error de inicio de sesión:', error.response.data.message);
      setError(error.response.data.message);
    }

    // Limpia los campos del formulario después del envío
    setUsername('');
    setPassword('');
  };

  return (
    <div className='Login'>
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div id="contraseña">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        {error && <div>{error}</div>}
        <Button type="submit">Iniciar sesión</Button>
      </form>
    </div>
  );
};

export default Login;
