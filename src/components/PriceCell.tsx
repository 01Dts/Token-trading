import { memo, useState, useEffect } from 'react';
import { Token } from '@/types/token';
import { formatPrice } from '@/lib/utils';

interface PriceCellProps {
  token: Token;
}

export const PriceCell = memo(({ token }: PriceCellProps) => {
  const [prevPrice, setPrevPrice] = useState(token.price);
  const [flash, setFlash] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    if (token.price > prevPrice) {
      setFlash('up');
    } else if (token.price < prevPrice) {
      setFlash('down');
    }
    setPrevPrice(token.price);
    
    const timer = setTimeout(() => setFlash(null), 500);
    return () => clearTimeout(timer);
  }, [token.price, prevPrice]);

  return (
    <div className={`transition-colors duration-500 ${
      flash === 'up' ? 'bg-green-500/20' : flash === 'down' ? 'bg-red-500/20' : ''
    }`}>
      <div className="font-mono font-medium">{formatPrice(token.price)}</div>
    </div>
  );
});

PriceCell.displayName = 'PriceCell';