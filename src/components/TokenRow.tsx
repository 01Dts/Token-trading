import { memo } from 'react';
import { TrendingUp, TrendingDown, Copy, CheckCircle } from 'lucide-react';
import { Token } from '@/types/token';
import { formatNumber } from '@/lib/utils';
import { PriceCell } from './PriceCell';
import { MiniChart } from './ui/MiniChart';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard ';

interface TokenRowProps {
  token: Token;
  onViewDetails: (token: Token) => void;
}

export const TokenRow = memo(({ token, onViewDetails }: TokenRowProps) => {
  const { copied, copy } = useCopyToClipboard();
  const isPositive = token.priceChange24h >= 0;

  return (
    <tr className="border-b border-gray-700 hover:bg-gray-800/50 transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xs font-bold">
            {token.symbol.slice(0, 2)}
          </div>
          <div>
            <div className="font-semibold flex items-center gap-2">
              {token.name}
              {token.badges?.map(badge => (
                <span key={badge} className="px-1.5 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded">
                  {badge}
                </span>
              ))}
            </div>
            <div className="text-xs text-gray-400 flex items-center gap-1">
              {token.symbol}
              <button
                onClick={() => copy(token.address)}
                className="hover:text-gray-300 transition-colors"
              >
                {copied ? <CheckCircle size={12} /> : <Copy size={12} />}
              </button>
            </div>
          </div>
        </div>
      </td>
      
      <td className="px-4 py-3">
        <PriceCell token={token} />
      </td>
      
      <td className="px-4 py-3">
        <div className={`flex items-center gap-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span className="font-medium">{Math.abs(token.priceChange24h).toFixed(2)}%</span>
        </div>
      </td>
      
      <td className="px-4 py-3">
        <div className="text-sm">{formatNumber(token.volume24h)}</div>
      </td>
      
      <td className="px-4 py-3">
        <div className="text-sm">{formatNumber(token.marketCap)}</div>
      </td>
      
      <td className="px-4 py-3">
        <div className="text-sm">{formatNumber(token.liquidity)}</div>
      </td>
      
      <td className="px-4 py-3">
        <div className="text-sm">{token.holders.toLocaleString()}</div>
      </td>
      
      <td className="px-4 py-3">
        <MiniChart data={token.chartData} />
      </td>
      
      <td className="px-4 py-3">
        <button
          onClick={() => onViewDetails(token)}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition-colors"
        >
          View
        </button>
      </td>
    </tr>
  );
});

TokenRow.displayName = 'TokenRow';