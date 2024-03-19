import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:5000/login', { username, password });
      if (res.data) {
        setIsLoggedIn(true);
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div>
      {!isLoggedIn ? (
        <div>
          <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          <button onClick={login}>Login</button>
        </div>
      ) : (
        <div>Welcome, {username}!</div>
      )}
    </div>
  );
}

export default App;