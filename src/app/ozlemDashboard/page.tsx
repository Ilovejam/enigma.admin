'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaWallet, FaChartLine, FaSignOutAlt, FaMoneyBillWaveAlt } from 'react-icons/fa';
import Image from 'next/image';

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
              onClick={() => setActiveTab('graphic')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === 'graphic'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <FaChartLine />
              Grafik
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
        {activeTab === 'graphic' && <CryptoGraphic />}
        {activeTab === 'trades' && <Trades username={username} password={password} />}
      </main>
    </div>
  );
}

function WalletSection({ username, password }: { username: string; password: string }) {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch('https://nox-admin-backend.vercel.app/api/getBalance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        const data = await response.json();

        if (response.ok && data.success) {
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Cüzdan</h1>
      <p className="text-lg">Bakiye: ${balance.toFixed(2)}</p>
    </div>
  );
}

function CryptoGraphic() {
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc'
        );
        const data = await response.json();

        if (response.ok) {
          setCoins(data);
        } else {
          console.error('API hatası:', data);
        }
      } catch (error) {
        console.error('Error fetching coins:', error);
      }
    };

    fetchCoins();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-4xl font-bold mb-6 text-center">Fiyatlar</h1>
      <div>
        {coins.map((coin) => (
          <div key={coin.id} className="flex items-center gap-4 p-4">
            <Image src={coin.image} alt={coin.name} width={32} height={32} />
            <div>
              <h2>{coin.name}</h2>
              <p>${coin.current_price.toFixed(2)}</p>
            </div>
          </div>
        ))}
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
                    <span className="font-bold">Bakiye:</span> ${trade.current_balance}
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
