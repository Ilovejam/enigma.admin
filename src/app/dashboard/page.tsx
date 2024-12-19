'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const user = params.get('username');
    const pass = params.get('password');

    if (!user || !pass) {
      router.push('/login');
    } else {
      setUsername(user);
      setPassword(pass);
    }
  }, [router]);

  if (!username || !password) {
    return null; // Kullanıcı bilgisi yüklenene kadar boş dön
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p className="text-lg">Welcome, {username}!</p>
      <button
        onClick={() => router.push('/login')}
        className="mt-4 p-2 bg-red-600 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
