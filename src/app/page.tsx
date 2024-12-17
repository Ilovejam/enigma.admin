'use client';

import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  const goToLogin = () => {
    router.push('/login');
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-black via-indigo-800 to-purple-900 text-white">
      {/* Uçan Animasyonlu Efektler */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-30 animate-pulse top-10 left-10"></div>
        <div className="absolute w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20 animate-bounce top-40 right-20"></div>
        <div className="absolute w-64 h-64 bg-pink-500 rounded-full blur-2xl opacity-40 animate-spin-slow bottom-20 left-1/3"></div>
        <div className="absolute w-80 h-80 bg-green-400 rounded-full blur-3xl opacity-25 animate-pulse bottom-10 right-10"></div>
      </div>

      {/* İçerik */}
      <div className="relative z-10 text-center">
        <h1 className="text-6xl font-extrabold mb-6 animate-fade-in">
          Welcome to <span className="text-yellow-400">Enigma Admin</span>
        </h1>
        <p className="text-xl mb-8 animate-fade-in delay-100">
          Manage your dashboard with <span className="text-blue-400">ease</span> and{" "}
          <span className="text-green-400">security</span>.
        </p>

        <button
          onClick={goToLogin}
          className="relative bg-yellow-400 text-black font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-yellow-500/50"
        >
          Go to Login
          <span className="absolute inset-0 bg-yellow-500 opacity-10 rounded-full animate-ping"></span>
        </button>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-sm opacity-80 z-10">
        © {new Date().getFullYear()} Enigma Admin. All rights reserved.
      </footer>
    </div>
  );
}
