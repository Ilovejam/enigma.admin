'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const users = [
  { username: 'admin1', password: 'fb82ae3b35e126cf' },
  { username: 'mehmetabi', password: 'Mehmetabi123.' },
  { username: 'özlemabla', password: 'Özlemabla123.' },
];

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
      // Giriş başarılıysa localStorage'a kaydediyoruz
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      router.push('/dashboard'); // Dashboard'a yönlendir
    } else {
      setErrorMessage('Invalid username or password!');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {errorMessage && <p>{errorMessage}</p>}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
