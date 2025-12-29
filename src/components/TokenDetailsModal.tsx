import { memo } from 'react';
import { ExternalLink, Copy, CheckCircle } from 'lucide-react';
import { Token } from '@/types/token';
import { formatNumber, formatPrice } from '@/lib/utils';
import { Modal } from './ui/Modal';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard ';

interface TokenDetailsModalProps {
  token: Token | null;
  onClose: () => void;
}

export const TokenDetailsModal = memo(({ token, onClose }: TokenDetailsModalProps) => {
  const { copied, copy } = useCopyToClipboard();

  if (!token) return null;

  return (
    <Modal isOpen={!!token} onClose={onClose}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold">
              {token.symbol.slice(0, 2)}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{token.name}</h2>
              <p className="text-gray-400">{token.symbol}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="text-gray-400 text-sm mb-1">Price</div>
            <div className="text-2xl font-bold">{formatPrice(token.price)}</div>
            <div className={`text-sm ${token.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
            </div>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="text-gray-400 text-sm mb-1">Market Cap</div>
            <div className="text-2xl font-bold">{formatNumber(token.marketCap)}</div>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="text-gray-400 text-sm mb-1">24h Volume</div>
            <div className="text-xl font-semibold">{formatNumber(token.volume24h)}</div>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="text-gray-400 text-sm mb-1">Liquidity</div>
            <div className="text-xl font-semibold">{formatNumber(token.liquidity)}</div>
          </div>
        </div>

        <div className="bg-gray-900 p-4 rounded-lg mb-6">
          <div className="text-gray-400 text-sm mb-2">Contract Address</div>
          <div className="flex items-center justify-between">
            <code className="text-sm font-mono">{token.address}</code>
            <button
              onClick={() => copy(token.address)}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors flex items-center gap-2"
            >
              {copied ? <><CheckCircle size={14} /> Copied!</> : <><Copy size={14} /> Copy</>}
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          {token.socialLinks?.twitter && (
            <a href={token.socialLinks.twitter} target="_blank" rel="noopener noreferrer"
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded flex items-center justify-center gap-2 transition-colors">
              <ExternalLink size={16} />
              Twitter
            </a>
          )}
          {token.socialLinks?.telegram && (
            <a href={token.socialLinks.telegram} target="_blank" rel="noopener noreferrer"
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded flex items-center justify-center gap-2 transition-colors">
              <ExternalLink size={16} />
              Telegram
            </a>
          )}
          {token.socialLinks?.website && (
            <a href={token.socialLinks.website} target="_blank" rel="noopener noreferrer"
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded flex items-center justify-center gap-2 transition-colors">
              <ExternalLink size={16} />
              Website
            </a>
          )}
        </div>
      </div>
    </Modal>
  );
});

TokenDetailsModal.displayName = 'TokenDetailsModal';