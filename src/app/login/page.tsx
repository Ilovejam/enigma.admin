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
      // Doğruysa yönlendir
      router.push(`/dashboard?username=${username}&password=${password}`);
    } else {
      // Yanlışsa hata mesajı göster
      setErrorMessage('Invalid username or password!');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-4xl font-extrabold text-center text-purple-600 mb-6">Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4 p-3 w-full rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 p-3 w-full rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
        />
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
        <button
          onClick={handleLogin}
          className="w-full p-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-200"
        >
          Login
        </button>
      </div>
    </div>
  );
}
