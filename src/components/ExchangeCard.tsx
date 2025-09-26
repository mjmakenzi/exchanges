export type Exchange = {
  id: number;
  button_text: string;
  exchange_url: string;
  meta: string[];
  slug: string;
  name: string;
  fa_name: string;
  logo_url: string;
  country: string;
  asset_count: number;
  coin?: {
    slug: string;
    symbol: string;
    name: string;
    fa_name: string;
    logo_url: string;
    trading_url: string;
  };
};

type Props = {
  exchange: Exchange;
};

const ExchangeCard = ({ exchange }: Props) => {
  // Color options for tags
  const tagColors = [
    'bg-blue-100 text-blue-800',
    'bg-green-100 text-green-800',
    'bg-yellow-100 text-yellow-800',
    'bg-purple-100 text-purple-800',
    'bg-pink-100 text-pink-800',
    'bg-indigo-100 text-indigo-800',
  ];

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-5">
        <div className="flex items-start">
          {/* Exchange Logo */}
          <div className="flex-shrink-0">
            <img
              className="h-12 w-12 rounded-full object-cover border-2 border-gray-100"
              src={exchange.logo_url}
              alt={`${exchange.fa_name} logo`}
            />
          </div>

          {/* Exchange Info */}
          <div className="ml-4 flex-1">
            <div className="flex items-baseline">
              <h2 className="text-lg font-bold text-gray-900">
                {exchange.fa_name}
              </h2>
              <span className="ml-2 text-sm text-gray-500">
                ({exchange.name})
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-600">
              {exchange.asset_count} دارایی • کشور: {exchange.country}
            </p>

            {/* Tags */}
            <div className="mt-2 flex flex-wrap gap-1">
              {exchange.meta.map((tag, index) => (
                <span
                  key={index}
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    tagColors[index % tagColors.length]
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-4">
          <a
            href={exchange.exchange_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
          >
            {exchange.button_text}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ExchangeCard;
