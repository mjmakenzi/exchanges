import type { CoinData } from '../services/api';

type Props = {
  coin: CoinData;
};

const CoinInfo = ({ coin }: Props) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border border-blue-100">
      <div className="flex items-center space-x-4 space-x-reverse">
        {/* Coin Logo */}
        <div className="flex-shrink-0">
          <img
            src={coin.logo_url}
            alt={`${coin.fa_name} logo`}
            className="h-16 w-16 rounded-full object-cover border-2 border-white shadow-lg"
          />
        </div>

        {/* Coin Information */}
        <div className="flex-1">
          <div className="flex items-baseline space-x-2 space-x-reverse">
            <h1 className="text-2xl font-bold text-gray-900">{coin.fa_name}</h1>
            <span className="text-lg text-gray-600">({coin.name})</span>
            <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded text-gray-700">
              {coin.symbol}
            </span>
          </div>
          <p className="text-gray-600 mt-1">
            انتخاب صرافی برای خرید {coin.fa_name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoinInfo;
