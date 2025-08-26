import { Property, Weather, FilterState } from "@/types";
import { getWeatherConditionLabel } from './weather';

export const filterProperties = (
  properties: Property[],
  filters: FilterState,
  weatherMap: Record<number, Weather>
): Property[] => {
  return properties.filter((property) => {
    // Search filter
    if (
      filters.search &&
      !property.name.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    // Tags filter
    if (
      filters.selectedTags.length > 0 &&
      !filters.selectedTags.some((tag) => property.tags?.includes(tag))
    ) {
      return false;
    }

    // Weather filters
    const weather = weatherMap[property.id];
    if (!weather) return true; // Show properties without weather data

    // Temperature range
    if (
      weather.temperature < filters.tempRange[0] ||
      weather.temperature > filters.tempRange[1]
    ) {
      return false;
    }

    // Humidity range
    if (
      weather.humidity < filters.humidityRange[0] ||
      weather.humidity > filters.humidityRange[1]
    ) {
      return false;
    }

    // Weather condition
    if (filters.condition !== null && filters.condition !== -1) {
      const selectedCondition = getWeatherConditionLabel(filters.condition);
      if (weather.condition !== selectedCondition) {
        return false;
      }
    }
    return true;
  });
};

export const getFilteredCount = (properties: Property[]): number =>
  properties.length;

export const isFilterActive = (filters: FilterState): boolean => {
  return !!(
    filters.search ||
    filters.selectedTags.length > 0 ||
    (filters.condition !== null && filters.condition !== -1) ||
    filters.tempRange[0] !== -20 ||
    filters.tempRange[1] !== 50 ||
    filters.humidityRange[0] !== 0 ||
    filters.humidityRange[1] !== 100
  );
};
