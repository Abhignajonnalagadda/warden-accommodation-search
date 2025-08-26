interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
}

export const ErrorState = ({ error, onRetry }: ErrorStateProps) => (
  <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-6">
    <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md">
      {/* Error Icon */}
      <div className="mb-6">
        <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center">
          <span className="text-4xl">⚠️</span>
        </div>
      </div>

      {/* Error Message */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h2>
      <p className="text-gray-600 mb-6 text-sm leading-relaxed">
        {error}
      </p>

      {/* Action Buttons */}
      <div className="space-y-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            🔄 Try Again
          </button>
        )}
        
        <button
          onClick={() => window.location.reload()}
          className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-200"
        >
          🔃 Refresh Page
        </button>
      </div>

      {/* Help Text */}
      <p className="text-xs text-gray-500 mt-6">
        If the problem persists, please check your internet connection or try again later.
      </p>
    </div>
  </div>
);
