'use client';

import { useSearchParams, useRouter } from 'next/navigation';

export default function Dashboard() {
  const searchParams = useSearchParams();
  const username = searchParams.get('username');
  const password = searchParams.get('password');
  const router = useRouter();

  // Kullanıcı bilgisi yoksa login'e gönder
  if (!username || !password) {
    router.push('/login');
    return null;
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
