import { PropertyWeatherCardProps } from '@/types';

const getWeatherIcon = (weatherCode: number) => {
  if (weatherCode === 0) return '☀️';
  if (weatherCode >= 1 && weatherCode <= 3) return '☁️';
  if (weatherCode >= 51 && weatherCode <= 57) return '🌦️';
  if (weatherCode >= 61 && weatherCode <= 67) return '🌧️';
  if (weatherCode >= 71 && weatherCode <= 77) return '❄️';
  return '🌤️';
};

const getWeatherLabel = (weatherCode: number) => {
  if (weatherCode === 0) return 'Clear';
  if (weatherCode >= 1 && weatherCode <= 3) return 'Cloudy';
  if (weatherCode >= 51 && weatherCode <= 57) return 'Drizzle';
  if (weatherCode >= 61 && weatherCode <= 67) return 'Rainy';
  if (weatherCode >= 71 && weatherCode <= 77) return 'Snow';
  return 'Unknown';
};

export const PropertyWeatherCard = ({ property, weather }: PropertyWeatherCardProps) => {
  const isActive = property.isActive;
  
  return (
    <div className={`rounded-xl shadow-lg border transition-all duration-300 overflow-hidden group relative ${
      isActive 
        ? 'bg-white border-gray-100 hover:shadow-xl' 
        : 'bg-gray-50 border-gray-200 opacity-75'
    }`}>
      
      {/* Inactive Overlay */}
      {!isActive && (
        <div className="absolute inset-0 bg-gray-400/10 z-10 pointer-events-none" />
      )}
      
      {/* Status Badge */}
      <div className={`absolute top-3 right-3 z-20 px-3 py-1 rounded-full text-xs font-semibold ${
        isActive 
          ? 'bg-green-100 text-green-700 border border-green-200' 
          : 'bg-red-100 text-red-700 border border-red-200'
      }`}>
        {isActive ? '🟢 Active' : '🔴 Inactive'}
      </div>

      {/* Header with conditional styling */}
      <div className={`p-4 ${
        isActive 
          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
          : 'bg-gradient-to-r from-gray-400 to-gray-500 text-gray-100'
      }`}>
        <h3 className={`text-lg font-bold truncate ${!isActive ? 'text-gray-200' : ''}`}>
          {property.name}
        </h3>
        <p className={`text-sm ${isActive ? 'text-blue-100' : 'text-gray-300'}`}>
          📍 {property.city}, {property.state}
        </p>
      </div>

      {/* Content with conditional styling */}
      <div className={`p-4 space-y-4 ${!isActive ? 'text-gray-500' : ''}`}>
        {/* Weather Information */}
        {weather ? (
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className={`text-2xl mb-1 ${!isActive ? 'opacity-60' : ''}`}>
                {getWeatherIcon(weather.weathercode)}
              </div>
              <p className={`text-xs font-medium ${isActive ? 'text-gray-600' : 'text-gray-500'}`}>
                {getWeatherLabel(weather.weathercode)}
              </p>
            </div>
            <div className="text-center">
              <div className={`text-xl font-bold ${isActive ? 'text-gray-800' : 'text-gray-600'}`}>
                {weather.temperature}°C
              </div>
              <p className={`text-xs ${isActive ? 'text-gray-600' : 'text-gray-500'}`}>Temperature</p>
            </div>
            <div className="text-center">
              <div className={`text-xl font-bold ${isActive ? 'text-gray-800' : 'text-gray-600'}`}>
                {weather.humidity}%
              </div>
              <p className={`text-xs ${isActive ? 'text-gray-600' : 'text-gray-500'}`}>Humidity</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className={`animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-2 ${
              isActive ? 'border-blue-500' : 'border-gray-400'
            }`}></div>
            <p className={`text-sm ${isActive ? 'text-gray-500' : 'text-gray-400'}`}>
              Loading weather...
            </p>
          </div>
        )}

        {/* Tags with conditional styling */}
        {property.tags && property.tags.length > 0 && (
          <div className="space-y-2">
            <p className={`text-sm font-semibold ${isActive ? 'text-gray-700' : 'text-gray-500'}`}>
              🏷️ Amenities
            </p>
            <div className="flex flex-wrap gap-2">
              {property.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className={`px-2 py-1 text-xs rounded-full border font-medium ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 border-blue-200' 
                      : 'bg-gray-100 text-gray-500 border-gray-200'
                  }`}
                >
                  {tag.replace('-', ' ')}
                </span>
              ))}
              {property.tags.length > 4 && (
                <span className={`px-2 py-1 text-xs rounded-full border ${
                  isActive 
                    ? 'bg-gray-50 text-gray-600 border-gray-200' 
                    : 'bg-gray-50 text-gray-400 border-gray-200'
                }`}>
                  +{property.tags.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Hover Effect - only for active properties */}
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/5 group-hover:to-purple-600/5 transition-all duration-300 pointer-events-none" />
      )}

      {/* Inactive Property Message */}
      {!isActive && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800/20 z-10 pointer-events-none">
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
            <p className="text-sm font-medium text-gray-700">Property Unavailable</p>
          </div>
        </div>
      )}
    </div>
  );
};
