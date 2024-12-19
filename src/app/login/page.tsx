'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (username === 'özlemabla' && password === 'Özlemabla123.') {
      router.push('/ozlemDashboard'); // Özlem'in Dashboard'una yönlendir
    } else if (username === 'mehmetabi' && password === 'Mehmetabi123.') {
      router.push('/mehmetDashboard'); // Mehmet'in Dashboard'una yönlendir
    } else {
      setErrorMessage('Invalid username or password!');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
