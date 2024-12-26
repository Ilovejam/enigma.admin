'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaWallet, FaChartLine, FaSignOutAlt, FaMoneyBillWaveAlt } from 'react-icons/fa';
import Image from 'next/image';
interface Trade {
  image: string;
  coin: string;
  current_balance: string;
  [key: string]: any;
}

export default function Dashboard() {
  const router = useRouter();
  const username = "özlemabla";
  const password = "Özlemabla123.";
  const [activeTab, setActiveTab] = useState<'wallet' | 'graphic' | 'trades'>('wallet');

  const handleLogout = () => {
    sessionStorage.clear(); // Oturumu temizle
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <aside className="w-64 bg-gray-800 bg-opacity-90 p-6 border-r border-gray-700 flex flex-col justify-between min-h-screen">
        <div>
          <div className="mb-8 text-center">
            <div className="bg-purple-600 text-white text-sm font-bold rounded-full px-4 py-2">
              {username}
            </div>
          </div>
          <nav className="flex flex-col gap-4">
            <button
              onClick={() => setActiveTab('wallet')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === 'wallet'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <FaWallet />
              Cüzdan
            </button>
            
            <button
              onClick={() => setActiveTab('trades')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === 'trades'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <FaMoneyBillWaveAlt />
              İşlem Geçmişi
            </button>
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 transition-all text-white font-semibold rounded-lg"
        >
          <FaSignOutAlt />
          Çıkış Yap
        </button>
      </aside>
      <main className="flex-1 p-8 min-h-screen">
        {activeTab === 'wallet' && <WalletSection username={username} password={password} />}
         {activeTab === 'trades' && <Trades username={username} password={password} />}
      </main>
    </div>
  );
}

function WalletSection({ username, password }: { username: string; password: string }) {
  const [balance, setBalance] = useState(505.855);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (!username || !password) {
          console.error('Kullanıcı adı veya şifre bulunamadı!');
          return;
        }

        const response = await fetch('https://nox-admin-backend.vercel.app/api/getBalance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (data.success) {
          setBalance(data.balance);
        } else {
          console.error('API hatası:', data.message);
        }
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetchBalance();
  }, [username, password]);

  const handleCopy = () => {
    navigator.clipboard.writeText("0x96F7E183cacD630cfD3B85e91d01A8745D8669AA");
    alert('ERC20 Wallet address copied to clipboard!');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Cüzdan</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center w-96">
        <h2 className="text-lg text-white font-bold">
          Bakiye: <span className="text-green-500">${balance.toFixed(2)}</span>
        </h2>
        <div className="flex items-center justify-between mt-4">
          <p className="text-gray-400 text-sm">ERC20 Wallet Address:</p>
          <button
            onClick={handleCopy}
            className="text-purple-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <span>Kopyala</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 15.75H6a2.25 2.25 0 01-2.25-2.25V6A2.25 2.25 0 016 3.75h7.5A2.25 2.25 0 0115.75 6v2.25M15 12h6m-3-3v6"
              />
            </svg>
          </button>
        </div>
        <p className="text-purple-400 font-mono truncate mt-2">0x96F7E183cacD630cfD3B85e91d01A8745D8669AA</p>
        <p className="text-gray-400 text-sm mt-4">
          <span className="font-bold text-yellow-500">%2 Transfer Ücreti</span> uygulanır.
        </p>
      </div>
    </div>
  );
}


 
function Trades({ username, password }: { username: string; password: string }) {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        if (!username || !password) {
          console.error('Kullanıcı adı veya şifre bulunamadı!');
          return;
        }

        const response = await fetch('https://nox-admin-backend.vercel.app/api/getBalance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (data.success) {
          setTrades(data.tradelist);
        } else {
          console.error('API hatası:', data.message);
        }
      } catch (error) {
        console.error('Error fetching trades:', error);
      }
    };

    fetchTrades();
  }, [username, password]);

  return (
    <div className="flex flex-col p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-500">İşlem Geçmişi</h1>
      <div className="flex flex-col gap-6">
        {trades.map((trade: Trade, index: number) => {
          const previousBalance = index > 0 ? parseFloat((trades[index - 1] as Trade).current_balance) : 0;
          const currentBalance = parseFloat(trade.current_balance);
          const profit = (currentBalance - previousBalance).toFixed(2);

          return (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center border border-gray-700"
            >
              <Image
                src={trade.image}
                alt={trade.coin}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div className="ml-4 flex-1">
                <h2 className="text-lg font-bold text-white">
                  {trade.coin} ({trade.symbol})
                </h2>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <p className="text-sm text-green-500">
                    <span className="font-bold">Alış Fiyatı:</span> ${trade.alış_fiyatı}
                  </p>
                  <p className="text-sm text-red-500">
                    <span className="font-bold">Satış Fiyatı:</span> ${trade.satış_fiyatı}
                  </p>
                  <p className="text-sm text-yellow-500 col-span-2">
                    <span className="font-bold">Bakiye:</span> $505.855
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
