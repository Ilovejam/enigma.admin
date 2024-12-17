'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaWallet, FaChartLine, FaSignOutAlt, FaCopy } from 'react-icons/fa';
type WalletData = {
  walletAddress: string;
  balance: string;
  asset: string;
};

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('wallet');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const isAuth = document.cookie.includes('auth=true');
    if (!isAuth) {
      router.push('/login');
    } else {
      const userCookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith('username='))
        ?.split('=')[1];
      setUsername(userCookie || 'Guest');
    }
  }, [router]);

  const handleLogout = () => {
    document.cookie = 'auth=false; path=/';
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 bg-opacity-90 p-6 border-r border-gray-700 flex flex-col justify-between min-h-screen">
        <div>
          <div className="mb-8 text-center">
            <div className="bg-purple-600 text-white text-sm font-bold rounded-full px-4 py-2">
              Logged in as: {username}
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
              Wallet
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
              Graphic
            </button>
          </nav>
        </div>

        {/* Logout Butonu */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 transition-all text-white font-semibold rounded-lg"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 min-h-screen">
        {activeTab === 'wallet' && <WalletSection />}
        {activeTab === 'graphic' && <CryptoGraphic />}
      </main>
    </div>
  );
}

function WalletSection() {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const response = await fetch('https://nox-admin-backend.vercel.app/api/usdt-info');
        if (!response.ok) throw new Error('Failed to fetch wallet info');
        const data: WalletData = await response.json(); 
        setWalletData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchWalletData();
  }, []);

  if (loading) return <LoadingComponent />;
  if (error) return <ErrorComponent error={error} />;

  const handleCopy = () => {
    if (walletData?.walletAddress) {
      navigator.clipboard.writeText(walletData.walletAddress);
      alert('Wallet address copied to clipboard!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Wallet Overview</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center w-96">
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-400 text-sm">ERC20 USDT Wallet Address:</p>
          <button
            onClick={handleCopy}
            className="text-purple-400 hover:text-white transition-colors"
          >
            <FaCopy />
          </button>
        </div>
        <p className="text-purple-400 font-mono truncate">{walletData?.walletAddress}</p>
        <div className="mt-6">
          <h2 className="text-lg text-white font-bold">
            Balance: <span className="text-green-500">$4899</span>
          </h2>
        </div>
      </div>
    </div>
  );
}


function LoadingComponent() {
  return (
    <div className="flex items-center justify-center h-full">
      <h1 className="text-4xl font-bold mb-4">Loading...</h1>
    </div>
  );
}

function ErrorComponent({ error }: { error: string }) {
  return (
    <div className="flex items-center justify-center h-full">
      <h1 className="text-4xl font-bold mb-4 text-red-500">Error</h1>
      <p className="text-gray-400">{error}</p>
    </div>
  );
}

 
 

function CryptoGraphic() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc')
      .then((response) => response.json())
      .then((data) => setCoins(data))
      .catch((error) => console.error('Error fetching coins:', error));
  }, []);

  const filteredCoins = coins.filter((coin: any) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );
  
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-4xl font-bold mb-6 text-center">Crypto Prices</h1>
      <input
        type="text"
        placeholder="Search coins..."
        className="mb-6 p-2 w-1/3 rounded bg-gray-700 text-white mx-auto"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="w-full overflow-x-auto">
        <table className="table-auto w-full bg-gray-800 text-white rounded-lg">
          <thead>
            <tr className="bg-purple-600">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price (USD)</th>
              <th className="px-4 py-2">24h Change</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoins.map((coin) => (
              <tr key={coin.id} className="border-t border-gray-700">
                <td className="px-4 py-2 flex items-center gap-2">
                  <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                  {coin.name}
                </td>
                <td className="px-4 py-2">${coin.current_price.toLocaleString()}</td>
                <td
                  className={`px-4 py-2 ${
                    coin.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
