'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const users = [
  { username: 'admin1', password: 'fb82ae3b35e126cf', dashboard: 'adminDashboard' },
  { username: 'mehmetabi', password: 'Mehmetabi123.', dashboard: 'mehmetDashboard' },
  { username: 'özlemabla', password: 'Özlemabla123.', dashboard: 'ozlemDashboard' },
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
      // Doğruysa kullanıcıya özel dashboard'a yönlendir
      router.push(`/${user.dashboard}`);
    } else {
      // Yanlışsa hata mesajı göster
      setErrorMessage('Invalid username or password!');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-100 dark:bg-neutral-900">
      <div className="bg-neutral-50 dark:bg-neutral-800 p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-4xl font-extrabold text-center text-indigo-600 dark:text-indigo-400 mb-6">
          Login
        </h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4 p-3 w-full rounded-lg border-2 border-neutral-300 dark:border-neutral-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 p-3 w-full rounded-lg border-2 border-neutral-300 dark:border-neutral-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
        />
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}
        <button
          onClick={handleLogin}
          className="w-full p-3 bg-indigo-600 dark:bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition duration-200"
        >
          Login
        </button>
      </div>
    </div>
  );
}
