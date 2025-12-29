import { memo, useState, useMemo } from 'react';
import { AlertCircle } from 'lucide-react';
import { Token, SortField, SortDirection } from '@/types/token';
import { TokenRow } from './TokenRow';
import { TokenDetailsModal } from './TokenDetailsModal';
import { Skeleton } from './ui/Skeleton';

interface TokenTableProps {
  tokens: Token[];
  category: string;
  loading: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const TokenTable = memo(({ tokens, category, loading }: TokenTableProps) => {
  const [sortField, setSortField] = useState<SortField>('volume24h');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);

  const sortedTokens = useMemo(() => {
    return [...tokens].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      const multiplier = sortDirection === 'asc' ? 1 : -1;
      return (aVal < bVal ? -1 : 1) * multiplier;
    });
  }, [tokens, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (tokens.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <AlertCircle size={48} className="mx-auto mb-4 opacity-50" />
        <p>No tokens found in this category</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-gray-900 text-gray-400">
            <tr>
              <th className="px-4 py-3">Token</th>
              <th className="px-4 py-3 cursor-pointer hover:text-white" onClick={() => handleSort('price')}>
                Price {sortField === 'price' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-4 py-3 cursor-pointer hover:text-white" onClick={() => handleSort('priceChange24h')}>
                24h % {sortField === 'priceChange24h' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-4 py-3 cursor-pointer hover:text-white" onClick={() => handleSort('volume24h')}>
                Volume {sortField === 'volume24h' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-4 py-3 cursor-pointer hover:text-white" onClick={() => handleSort('marketCap')}>
                Market Cap {sortField === 'marketCap' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-4 py-3 cursor-pointer hover:text-white" onClick={() => handleSort('liquidity')}>
                Liquidity {sortField === 'liquidity' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-4 py-3 cursor-pointer hover:text-white" onClick={() => handleSort('holders')}>
                Holders {sortField === 'holders' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-4 py-3">Chart</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedTokens.map(token => (
              <TokenRow 
                key={token.id} 
                token={token} 
                onViewDetails={setSelectedToken}
              />
            ))}
          </tbody>
        </table>
      </div>

      <TokenDetailsModal 
        token={selectedToken} 
        onClose={() => setSelectedToken(null)}
      />
    </>
  );
});

TokenTable.displayName = 'TokenTable';