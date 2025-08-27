import { prisma } from '@/database/prisma';
import { Property } from '@/types';

/**
 * Server-side function to fetch properties
 * This runs on the server, not in the browser
 */
export async function getProperties(searchText?: string): Promise<Property[]> {
  try {
    // Build the where clause for filtering
    const whereClause = searchText ? {
      OR: [
        { name: { contains: searchText, mode: 'insensitive' } },
        { city: { contains: searchText, mode: 'insensitive' } },
        { state: { contains: searchText, mode: 'insensitive' } }
      ]
    } : {};
    
    // Fetch properties from database
    const properties = await prisma.property.findMany({
      where: whereClause,
      take: 20,
      orderBy: { createdAt: 'desc' }
    });
    
    return properties;
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw new Error('Failed to fetch properties');
  }
}

/**
 * Server-side function to fetch weather data for a property
 * This runs on the server, not in the browser
 */
export async function getWeatherData(lat: number, lng: number) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&hourly=relativehumidity_2m`,
      { next: { revalidate: 300 } } // Cache for 5 minutes
    );
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      temperature: data.current_weather.temperature,
      humidity: data.hourly.relativehumidity_2m[0],
      weathercode: data.current_weather.weathercode,
      condition: getWeatherConditionLabel(data.current_weather.weathercode),
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
}

/**
 * Helper function to convert weather codes to labels
 */
function getWeatherConditionLabel(weathercode: number): string {
  if (weathercode === 0) return 'Clear';
  if (weathercode >= 1 && weathercode <= 3) return 'Cloudy';
  if (weathercode >= 51 && weathercode <= 57) return 'Drizzle';
  if (weathercode >= 61 && weathercode <= 67) return 'Rainy';
  if (weathercode >= 71 && weathercode <= 77) return 'Snow';
  return `Unknown (${weathercode})`;
}
