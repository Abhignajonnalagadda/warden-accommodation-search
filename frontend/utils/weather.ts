/**
 * Utility functions for weather-related operations
 */

/**
 * Converts WMO weather code to human-readable condition label
 * @param weathercode - WMO weather code number
 * @returns Human-readable weather condition string
 */
export const getWeatherConditionLabel = (weathercode: number): string => {
  if (weathercode === 0) return 'Clear';
  if (weathercode >= 1 && weathercode <= 3) return 'Cloudy';
  if (weathercode >= 51 && weathercode <= 57) return 'Drizzle';
  if (weathercode >= 61 && weathercode <= 67) return 'Rainy';
  if (weathercode >= 71 && weathercode <= 77) return 'Snow';
  return `Unknown (${weathercode})`;
};
