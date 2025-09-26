import { useState, useEffect } from 'react';
import ExchangeCard from './components/ExchangeCard';
import { fetchExchanges } from './services/api';
import type { Exchange } from './components/ExchangeCard';

function App() {
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadExchanges = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchExchanges('bitcoin');
        setExchanges(data);
      } catch (err) {
        setError('خطا در بارگذاری داده‌ها');
        console.error('Error loading exchanges:', err);
      } finally {
        setLoading(false);
      }
    };

    loadExchanges();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            صرافی‌های ارز دیجیتال
          </h1>
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <span className="mr-2 text-gray-600">در حال بارگذاری...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            صرافی‌های ارز دیجیتال
          </h1>
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              تلاش مجدد
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          صرافی‌های ارز دیجیتال
        </h1>
        <div className="space-y-4">
          {exchanges.length > 0 ? (
            exchanges.map((ex) => <ExchangeCard key={ex.id} exchange={ex} />)
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">هیچ صرافی‌ای یافت نشد</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
