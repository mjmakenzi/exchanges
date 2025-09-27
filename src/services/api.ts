export interface Exchange {
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
}

export interface CoinData {
  slug: string;
  symbol: string;
  name: string;
  fa_name: string;
  logo_url: string;
  trading_url: string;
}

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? '/api/v1/pub/revive/buy-button'
    : 'https://nexus-api-dev.arzops.link/api/v1/pub/revive/buy-button');

export const fetchExchanges = async (
  coinSlug?: string,
  coinValue?: string
): Promise<Exchange[]> => {
  try {
    // Get slug and coin from URL query params if not provided
    const urlParams = new URLSearchParams(window.location.search);
    const coinParam = coinValue || urlParams.get('coin') || '';
    const slugParam = coinSlug || urlParams.get('slug') || '';

    // Convert coin to slug if coin is provided, otherwise use slug
    const finalSlug = coinParam || slugParam || 'bitcoin';

    // Build query parameters - API only understands 'slug'
    const queryParams = new URLSearchParams({
      slug: finalSlug,
      web_app: 'true',
    });

    const response = await fetch(`${API_BASE_URL}?${queryParams.toString()}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data.data) ? data.data : [];
  } catch (error) {
    console.error('Error fetching exchanges:', error);
    // Return empty array on error to prevent app crash
    return [];
  }
};

// Utility function to get current coin slug from URL (coin takes priority over slug)
export const getCurrentCoinSlug = (): string => {
  const urlParams = new URLSearchParams(window.location.search);
  const coinParam = urlParams.get('coin') || '';
  const slugParam = urlParams.get('slug') || '';
  return coinParam || slugParam || 'bitcoin';
};

// Utility function to get current coin value from URL
export const getCurrentCoinValue = (): string => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('coin') || '';
};

// Utility function to update URL with new coin slug
export const updateCoinSlug = (newSlug: string): void => {
  const url = new URL(window.location.href);
  url.searchParams.set('slug', newSlug);
  window.history.pushState({}, '', url.toString());
};

// Utility function to update URL with new coin value
export const updateCoinValue = (newCoin: string): void => {
  const url = new URL(window.location.href);
  url.searchParams.set('coin', newCoin);
  window.history.pushState({}, '', url.toString());
};

// Utility function to update both slug and coin
export const updateCoinParams = (newSlug: string, newCoin?: string): void => {
  const url = new URL(window.location.href);
  url.searchParams.set('slug', newSlug);
  if (newCoin) {
    url.searchParams.set('coin', newCoin);
  } else {
    url.searchParams.delete('coin');
  }
  window.history.pushState({}, '', url.toString());
};

// Get coin data from the first exchange (all exchanges have the same coin data)
export const getCoinData = (exchanges: Exchange[]): CoinData | null => {
  if (exchanges.length > 0 && exchanges[0].coin) {
    return exchanges[0].coin;
  }
  return null;
};
