import { memo } from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton = memo(({ className = '' }: SkeletonProps) => (
  <div className={`animate-pulse bg-gray-700 rounded ${className}`} />
));

Skeleton.displayName = 'Skeleton';