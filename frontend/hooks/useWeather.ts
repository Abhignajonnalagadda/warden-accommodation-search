// hooks/useWeather.ts
import { useEffect, useState, useCallback } from 'react';
import { Property, Weather } from '@/types';
import { WEATHER_API_BASE } from '@/constants';

export const useWeather = (properties: Property[]) => {
  const [weatherMap, setWeatherMap] = useState<Record<number, Weather>>({});

  const fetchWeather = useCallback(async (property: Property) => {
    if (!property.lat || !property.lng) return;

    try {
      const response = await fetch(
        `${WEATHER_API_BASE}?latitude=${property.lat}&longitude=${property.lng}&current_weather=true&hourly=relativehumidity_2m`
      );
      
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }

      const data = await response.json();
      
      setWeatherMap(prev => ({
        ...prev,
        [property.id]: {
          temperature: data.current_weather.temperature,
          humidity: data.hourly.relativehumidity_2m[0],
          weathercode: data.current_weather.weathercode,
        },
      }));
    } catch (error) {
      console.error(`Error fetching weather for property ${property.id}:`, error);
    }
  }, []);

  useEffect(() => {
    properties.forEach(property => {
      if (!weatherMap[property.id] && property.lat && property.lng) {
        fetchWeather(property);
      }
    });
  }, [properties, weatherMap, fetchWeather]);

  return weatherMap;
};
