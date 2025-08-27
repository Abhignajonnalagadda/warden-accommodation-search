import { getProperties, getWeatherData } from './lib/data';
import { Header } from '@/components/Header';
import { ClientFilters } from '@/components/ClientFilters';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { Property, Weather } from '@/types';

export default async function Home() {
  try {
    // Fetch properties server-side (this runs on the server!)
    const properties = await getProperties();
    
    // Fetch weather data for all properties server-side
    const weatherPromises = properties
      .filter((property: Property) => property.lat && property.lng)
      .map(async (property: Property) => {
        const weather = await getWeatherData(property.lat!, property.lng!);
        return { propertyId: property.id, weather };
      });
    
    const weatherResults = await Promise.allSettled(weatherPromises);
    
    // Build weather map
    const weatherMap: Record<number, Weather> = {};
    weatherResults.forEach((result: PromiseSettledResult<{ propertyId: number; weather: Weather | null }>) => {
      if (result.status === 'fulfilled' && result.value.weather) {
        weatherMap[result.value.propertyId] = result.value.weather;
      }
    });

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Header />
        
        <div className="container mx-auto px-6 py-8">
          <ClientFilters 
            initialProperties={properties}
            initialWeatherMap={weatherMap}
          />
        </div>
      </div>
    );
    
  } catch (error) {
    console.error('Error in Home component:', error);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Header />
        
        <div className="container mx-auto px-6 py-8">
          <ErrorState 
            error={error instanceof Error ? error.message : 'An error occurred'} 
            onRetry={() => window.location.reload()} 
          />
        </div>
      </div>
    );
  }
}
