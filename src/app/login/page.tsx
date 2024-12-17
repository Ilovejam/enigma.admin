'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { users } from '@/lib/auth';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
      setErrorMessage('');
      document.cookie = `auth=true; path=/`; // Cookie ayarla
      router.push('/dashboard'); // Dashboard'a yönlendir
    } else {
      setErrorMessage('Invalid username or password!');
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-purple-900 to-black text-white">
      {/* Animasyonlu Arka Plan Efektleri */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-purple-700 rounded-full blur-3xl opacity-30 top-10 left-10 animate-pulse"></div>
        <div className="absolute w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-20 bottom-20 right-20 animate-ping"></div>
        <div className="absolute w-72 h-72 bg-indigo-500 rounded-full blur-3xl opacity-40 top-20 right-40 animate-spin-slow"></div>
      </div>

      {/* Login Kutusu */}
      <div className="relative z-10 bg-gray-900 bg-opacity-80 p-10 rounded-2xl shadow-2xl w-96 text-center backdrop-blur-md border border-purple-500/30">
        <h1 className="text-4xl font-extrabold mb-4 text-purple-400 tracking-wider">
          Crypto Login
        </h1>
        <p className="text-gray-400 mb-6">Enter your credentials to access the dashboard</p>

        {/* Kullanıcı Adı Input */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 mb-4 text-gray-900 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Şifre Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-6 text-gray-900 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Hata Mesajı */}
        {errorMessage && (
          <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
        )}

        {/* Login Butonu */}
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
