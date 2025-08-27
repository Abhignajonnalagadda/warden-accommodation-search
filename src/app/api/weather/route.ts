import { NextResponse } from 'next/server';

const WEATHER_API_BASE = 'https://api.open-meteo.com/v1/forecast';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    
    // Validate required parameters
    if (!lat || !lng) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required parameters: lat and lng' 
        },
        { status: 400 }
      );
    }
    
    // Call Open-Meteo API
    const weatherResponse = await fetch(
      `${WEATHER_API_BASE}?latitude=${lat}&longitude=${lng}&current_weather=true&hourly=relativehumidity_2m`
    );
    
    if (!weatherResponse.ok) {
      throw new Error(`Weather API error: ${weatherResponse.status}`);
    }
    
    const weatherData = await weatherResponse.json();
    
    // Process and format the weather data
    const processedWeather = {
      temperature: weatherData.current_weather.temperature,
      humidity: weatherData.hourly.relativehumidity_2m[0],
      weathercode: weatherData.current_weather.weathercode,
      condition: getWeatherConditionLabel(weatherData.current_weather.weathercode),
      timestamp: new Date().toISOString()
    };
    
    return NextResponse.json({
      success: true,
      data: processedWeather,
      coordinates: { lat: parseFloat(lat), lng: parseFloat(lng) }
    });
    
  } catch (error) {
    console.error('Error fetching weather:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch weather data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Helper function to convert weather codes to labels
function getWeatherConditionLabel(weathercode: number): string {
  if (weathercode === 0) return 'Clear';
  if (weathercode >= 1 && weathercode <= 3) return 'Cloudy';
  if (weathercode >= 51 && weathercode <= 57) return 'Drizzle';
  if (weathercode >= 61 && weathercode <= 67) return 'Rainy';
  if (weathercode >= 71 && weathercode <= 77) return 'Snow';
  return `Unknown (${weathercode})`;
}
