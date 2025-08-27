'use client';

import { ErrorState } from '@/components/ErrorState';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState 
      error={error.message} 
      onRetry={reset} 
    />
  );
}
