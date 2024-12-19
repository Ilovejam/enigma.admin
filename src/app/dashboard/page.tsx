'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    const storedPassword = sessionStorage.getItem('password');

    if (!storedUsername || !storedPassword) {
      router.push('/login'); // Eğer kullanıcı bilgileri yoksa login sayfasına yönlendir
    } else {
      setUsername(storedUsername);
      setPassword(storedPassword);
    }
  }, [router]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Username: {username}</p>
      <p>Password: {password}</p>
      <button
        onClick={() => {
          sessionStorage.clear(); // Çıkış yapıldığında verileri temizle
          router.push('/login');
        }}
      >
        Logout
      </button>
    </div>
  );
}
