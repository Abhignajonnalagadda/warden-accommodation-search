interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
}

export const ErrorState = ({ error, onRetry }: ErrorStateProps) => (
  <div className="p-6">
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      <strong>Error:</strong> {error}
      {onRetry && (
        <button 
          onClick={onRetry} 
          className="ml-2 underline hover:text-red-800"
        >
          Retry
        </button>
      )}
    </div>
  </div>
);
