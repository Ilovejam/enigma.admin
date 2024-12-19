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
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // Kullanıcı bilgilerini URL query üzerinden dashboard'a ilet
      router.push(`/dashboard?username=${user.username}&password=${user.password}`);
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-purple-900 to-black text-white">
      <div className="relative z-10 bg-gray-900 bg-opacity-80 p-10 rounded-2xl shadow-2xl w-96 text-center backdrop-blur-md border border-purple-500/30">
        <h1 className="text-4xl font-extrabold mb-4 text-purple-400 tracking-wider">Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 mb-4 text-gray-900 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-6 text-gray-900 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-transform transform hover:scale-105 text-white font-semibold py-2 rounded-lg shadow-lg"
        >
          Login
        </button>
      </div>
    </div>
  );
}
