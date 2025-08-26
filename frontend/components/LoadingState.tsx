interface LoadingStateProps {
  message?: string;
}

export const LoadingState = ({ message = "Loading properties..." }: LoadingStateProps) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
    <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md">
      {/* Animated Logo */}
      <div className="mb-6">
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
          <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
            <span className="text-2xl">🏠</span>
          </div>
        </div>
      </div>

      {/* Loading Text */}
      <h2 className="text-xl font-bold text-gray-800 mb-2">Loading Properties</h2>
      <p className="text-gray-600 mb-6">{message}</p>

      {/* Animated Dots */}
      <div className="flex justify-center space-x-1">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
);
