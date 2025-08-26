import { Property, Weather } from '@/types';
import { PropertyWeatherCard } from './PropertyWeatherCard';

interface PropertiesGridProps {
  properties: Property[];
  weatherMap: Record<number, Weather>;
}

export const PropertiesGrid = ({ properties, weatherMap }: PropertiesGridProps) => {
  if (properties.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No properties match your current filters. Try adjusting your search criteria.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {properties.map((property) => (
        <PropertyWeatherCard
          key={property.id}
          property={property}
          weather={weatherMap[property.id]}
        />
      ))}
    </div>
  );
};
