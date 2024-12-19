'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaWallet, FaChartLine, FaSignOutAlt, FaCopy, FaMoneyBillWaveAlt } from 'react-icons/fa';
import Image from 'next/image';

const users = [
  { username: 'admin1', password: 'fb82ae3b35e126cf' },
  { username: 'mehmetabi', password: 'Mehmetabi123.' },
  { username: 'özlemabla', password: 'Özlemabla123.' },
];

const authenticateUser = (username: string, password: string): boolean => {
  return users.some(
    (user) => user.username === username && user.password === password
  );
};



interface WalletData {
  walletAddress: string;
  balance: string;
  asset: string;
}

interface Coin {
  id: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}
interface Trade {
  image: string;
  coin: string;
  current_balance: string;
  [key: string]: any; // Diğer alanları da kabul eder
}


export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'wallet' | 'graphic' | 'trades'>('wallet');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Kullanıcı bilgilerini sessionStorage'dan al
    const savedUsername = sessionStorage.getItem('username');
    const savedPassword = sessionStorage.getItem('password');

    // Doğrulama kontrolü
    if (!savedUsername || !savedPassword || !authenticateUser(savedUsername, savedPassword)) {
      router.push('/login'); // Giriş yapılmamışsa login'e yönlendir
    } else {
      setUsername(savedUsername);
      setPassword(savedPassword);
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
    router.push('/login');
  };
  
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <aside className="w-64 bg-gray-800 bg-opacity-90 p-6 border-r border-gray-700 flex flex-col justify-between min-h-screen">
        <div>
          <div className="mb-8 text-center">
          <div className="bg-purple-600 text-white text-sm font-bold rounded-full px-4 py-2">
                {username} {/* Kullanıcı adı */}
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
        {activeTab === 'wallet' && <WalletSection />}
        {activeTab === 'graphic' && <CryptoGraphic />}
        {activeTab === 'trades' && <Trades />}

      </main>
    </div>
  );
}

const staticUsdtAddress = "0x96F7E183cacD630cfD3B85e91d01A8745D8669AA";

function WalletSection() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        // localStorage'dan username ve password değerlerini al
        const savedUsername = sessionStorage.getItem('username');
      const savedPassword = sessionStorage.getItem('password');

  
        // Eğer username veya password yoksa, işlemi durdur
        if (!savedUsername || !savedPassword) {
          console.error('Kullanıcı adı veya şifre bulunamadı!');
          return;
        }
  
        // API çağrısı yap
        const response = await fetch('https://nox-admin-backend.vercel.app/api/getBalance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: savedUsername, password: savedPassword }),
        });
  
        const data = await response.json();
  
        // Başarılı sonuç aldıysanız balance state'ini güncelle
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
  }, []);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(staticUsdtAddress);
    alert('Wallet address copied to clipboard!');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6">
        Cüzdan - Bakiye <span className="text-yellow-200">ERC 20</span>
      </h1>
      <p className="text-xl font-bold mb-6">
        Transfer Kesintisi <span className="text-yellow-200">%1-%3</span>
      </p>
      <p className="text-xl font-bold mb-6">
         <span className="text-yellow-200">Bakiye güncellenmesi proxy sebebi ile gecikmelidir</span>
      </p>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center w-96">
        <div className="mt-6">
          <h2 className="text-lg text-white font-bold">
            Bakiye: <span className="text-green-500">${balance.toFixed(2)}</span>
          </h2>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-gray-400 text-sm">Wallet Address:</p>
          <button
            onClick={handleCopy}
            className="text-purple-400 hover:text-white transition-colors"
          >
            Kopyala
          </button>
        </div>
        <p className="text-purple-400 font-mono truncate mt-2">{staticUsdtAddress}</p>
      </div>
    </div>
  );
}

 


 

function CryptoGraphic() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc')
        .then((response) => response.json())
        .then((data: Coin[]) => setCoins(data))
        .catch((error) => console.error('Error fetching coins:', error));
    }
  }, []);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  


  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-4xl font-bold mb-6 text-center">Fiyatlar</h1>
      <input
        type="text"
        placeholder="Coin ara..."
        className="mb-6 p-2 w-1/3 rounded bg-gray-700 text-white mx-auto"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="w-full overflow-x-auto">
        <table className="table-auto w-full bg-gray-800 text-white rounded-lg">
          <thead>
            <tr className="bg-purple-600">
              <th className="px-4 py-2">İsim</th>
              <th className="px-4 py-2">Fiyat (USD)</th>
              <th className="px-4 py-2">24h Değişim</th>
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

       <div className="flex flex-col gap-4">
       {trades.length > 0 ? (
  trades.map((trade: Trade, index: number) => {
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
          width={50} // Genişlik
          height={50} // Yükseklik
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
  })
) : (
  <p className="text-center text-gray-400">Trade bulunamadı.</p>
)}

      </div>

    </div>
  );
}

function Trades() {
  const [trades, setTrades] = useState([]);

  const fetchTrades = async () => {
    try {
      const savedUsername = sessionStorage.getItem('username');
      const savedPassword = sessionStorage.getItem('password');

  
      if (!savedUsername || !savedPassword) {
        console.error('Kullanıcı adı veya şifre bulunamadı!');
        return;
      }
  
      const response = await fetch('https://nox-admin-backend.vercel.app/api/getBalance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: savedUsername, password: savedPassword }),
      });
  
      const data = await response.json();
      if (data.success) {
        setTrades(data.tradelist); // İşlem geçmişini state'e aktar
      }
    } catch (error) {
      console.error('Error fetching trades:', error);
    }
  };

  // `useEffect` ile bileşen yüklendiğinde işlemleri getir
  useEffect(() => {
    fetchTrades();
  }, []);

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
        width={50} // Genişlik
        height={50} // Yükseklik
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


