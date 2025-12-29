'use client';

import { useState, useEffect } from 'react';
import { Token } from '@/types/token';
import { useTokens } from '@/hooks/useTokens';
import { TokenTable } from '@/components/TokenTable';
import { Tooltip } from '@/components/ui/Tooltip';
import { useWebSocketMock } from '@/hooks/useWebSocket';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Token['category']>('new');
  const [loading, setLoading] = useState(true);
  const [liveUpdates, setLiveUpdates] = useState(true);

  const initialTokens = useTokens();

  const newPairs = useWebSocketMock(initialTokens.new, liveUpdates && activeTab === 'new');
  const finalStretch = useWebSocketMock(initialTokens.final, liveUpdates && activeTab === 'final');
  const migrated = useWebSocketMock(initialTokens.migrated, liveUpdates && activeTab === 'migrated');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { id: 'new' as const, label: 'New Pairs', count: newPairs.length },
    { id: 'final' as const, label: 'Final Stretch', count: finalStretch.length },
    { id: 'migrated' as const, label: 'Migrated', count: migrated.length }
  ];

  const currentTokens = activeTab === 'new' ? newPairs : activeTab === 'final' ? finalStretch : migrated;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-8 max-w-[1400px]">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Token Discovery
            </h1>
            <div className="flex items-center gap-4">
              <Tooltip content="Live price updates via WebSocket">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={liveUpdates}
                    onChange={(e) => setLiveUpdates(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Live Updates</span>
                </label>
              </Tooltip>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className={`w-2 h-2 rounded-full ${liveUpdates ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
                {liveUpdates ? 'Connected' : 'Disconnected'}
              </div>
            </div>
          </div>

          <div className="flex gap-2 border-b border-gray-800">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium transition-all relative ${
                  activeTab === tab.id
                    ? 'text-blue-400'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab.label}
                <span className="ml-2 px-2 py-0.5 bg-gray-800 rounded text-xs">
                  {tab.count}
                </span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
                )}
              </button>
            ))}
          </div>
        </header>
        <main>
      <TokenTable 
        tokens={currentTokens} 
        category={activeTab}
        loading={loading}
      />
    </main>
  </div>
</div>
);
}