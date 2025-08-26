import { PropertyWeatherCardProps } from '@/types';

export const PropertyWeatherCard = ({ property, weather }: PropertyWeatherCardProps) => {
  return (
    <div className="border p-4 rounded shadow hover:shadow-md transition-shadow">
      <h2 className="font-bold text-lg mb-2">{property.name}</h2>
      <p className="text-gray-600 mb-3">
        {property.city}, {property.state}, {property.country}
      </p>
      
      {weather ? (
        <div className="space-y-1">
          <p className="text-sm">
            <span className="font-medium">Temperature:</span> {weather.temperature}°C
          </p>
          <p className="text-sm">
            <span className="font-medium">Humidity:</span> {weather.humidity}%
          </p>
          <p className="text-sm">
            <span className="font-medium">Weather:</span> {weather.weathercode}
          </p>
        </div>
      ) : (
        <p className="text-gray-500 text-sm">Loading weather...</p>
      )}
      
      {property.tags && property.tags.length > 0 && (
        <div className="mt-3 pt-3 border-t">
          <div className="flex flex-wrap gap-1">
            {property.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
            {property.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{property.tags.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
