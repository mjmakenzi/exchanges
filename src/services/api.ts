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

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  'https://lake.arzdigital.com/app-dev/api/v1/pub/revive/buy-button';

export const fetchExchanges = async (
  coinSlug: string = 'bitcoin'
): Promise<Exchange[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}?slug=${coinSlug}&web_app=true`
    );

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
