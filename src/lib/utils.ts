import { Token } from "@/types/token";

export const formatNumber = (num: number): string => {
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
  return `$${num.toFixed(2)}`;
};

export const formatPrice = (price: number): string => {
  if (price < 0.01) return `$${price.toFixed(6)}`;
  if (price < 1) return `$${price.toFixed(4)}`;
  return `$${price.toFixed(2)}`;
};

export const truncateAddress = (addr: string): string => {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
};

export const generateMockToken = (category: Token['category'], index: number): Token => {
  const basePrice = Math.random() * 10;
  const chartData = Array.from({ length: 24 }, (_, i) => ({
    time: Date.now() - (23 - i) * 3600000,
    price: basePrice * (1 + (Math.random() - 0.5) * 0.2)
  }));

  return {
    id: `token-${category}-${index}`,
    name: `Token ${category.toUpperCase()} ${index + 1}`,
    symbol: `TKN${index}`,
    address: `0x${Math.random().toString(16).slice(2, 42)}`,
    price: basePrice,
    priceChange24h: (Math.random() - 0.5) * 100,
    volume24h: Math.random() * 10000000,
    marketCap: Math.random() * 50000000,
    liquidity: Math.random() * 5000000,
    holders: Math.floor(Math.random() * 10000),
    transactions24h: Math.floor(Math.random() * 5000),
    createdAt: new Date(Date.now() - Math.random() * 86400000),
    chartData,
    category,
    badges: Math.random() > 0.7 ? ['Verified', 'Hot'] : undefined,
    socialLinks: {
      twitter: Math.random() > 0.5 ? 'https://twitter.com' : undefined,
      telegram: Math.random() > 0.5 ? 'https://t.me' : undefined,
      website: Math.random() > 0.5 ? 'https://example.com' : undefined
    }
  };
};