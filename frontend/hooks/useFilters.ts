import { useState, useMemo, useCallback } from 'react';
import { FilterState, UseFiltersReturn, Property, Weather } from '@/types';
import { TEMPERATURE_RANGE, HUMIDITY_RANGE } from '@/constants';
import { filterProperties } from '@/utils/filters';

export const useFilters = (
  properties: Property[],
  weatherMap: Record<number, Weather>
): UseFiltersReturn => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    tempRange: [TEMPERATURE_RANGE.MIN, TEMPERATURE_RANGE.MAX],
    humidityRange: [HUMIDITY_RANGE.MIN, HUMIDITY_RANGE.MAX],
    selectedTags: [],
    condition: -1
  });

  const updateFilters = useCallback((updates: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...updates }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      search: '',
      tempRange: [TEMPERATURE_RANGE.MIN, TEMPERATURE_RANGE.MAX],
      humidityRange: [HUMIDITY_RANGE.MIN, HUMIDITY_RANGE.MAX],
      selectedTags: [],
      condition: -1
    });
  }, []);

  const filteredProperties = useMemo(() => {
    return filterProperties(properties, filters, weatherMap);
  }, [properties, filters, weatherMap]);

  const filteredCount = useMemo(() => {
    return filteredProperties.length - 1;
  }, [filteredProperties]);

  return {
    filters,
    updateFilters,
    resetFilters,
    filteredProperties,
    filteredCount
  };
};
