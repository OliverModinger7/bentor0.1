import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogin = async () => {
    try {
      await axios.post('http://localhost:5000/login', {
        username,
        password,
      });
      setShowConfirmation(true); // Mostrar el formulario de confirmación de contraseña
    } catch (error) {
      console.error('Login failed:', error.response.data.message);
    }
  };

  const handleConfirmPassword = () => {
    if (password === confirmPassword) {
      onLogin(); // Si la contraseña coincide, llamar a la función onLogin para redirigir a la siguiente página
    } else {
      console.error('Passwords do not match');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      {!showConfirmation && <button onClick={handleLogin}>Login</button>}
      {showConfirmation && (
        <div>
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
          <button onClick={handleConfirmPassword}>Confirm Password</button>
        </div>
      )}
    </div>
  );
};

export default LoginPage;