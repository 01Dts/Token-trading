export interface Token {
  id: string;
  name: string;
  symbol: string;
  address: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  liquidity: number;
  holders: number;
  transactions24h: number;
  createdAt: Date;
  chartData: { time: number; price: number }[];
  category: 'new' | 'final' | 'migrated';
  badges?: string[];
  socialLinks?: {
    twitter?: string;
    telegram?: string;
    website?: string;
  };
}

export type SortField = 'price' | 'priceChange24h' | 'volume24h' | 'marketCap' | 'liquidity' | 'holders';
export type SortDirection = 'asc' | 'desc';