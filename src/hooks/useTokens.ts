import { useMemo } from 'react';
import { generateMockToken } from '@/lib/utils';

export const useTokens = () => {
  const tokens = useMemo(() => ({
    new: Array.from({ length: 10 }, (_, i) => generateMockToken('new', i)),
    final: Array.from({ length: 10 }, (_, i) => generateMockToken('final', i)),
    migrated: Array.from({ length: 10 }, (_, i) => generateMockToken('migrated', i))
  }), []);

  return tokens;
};