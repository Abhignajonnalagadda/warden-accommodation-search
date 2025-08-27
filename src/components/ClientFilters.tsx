"use client";

import { useState, useMemo } from 'react';
import { Property, Weather, FilterState } from '@/types';
import { PropertyFilters } from './PropertyFilters';
import { PropertiesGrid } from './PropertiesGrid';
import { filterProperties } from '@/utils/filters';
import { PROPERTY_TAGS } from '@/constants';

interface ClientFiltersProps {
  initialProperties: Property[];
  initialWeatherMap: Record<number, Weather>;
}

export const ClientFilters = ({ initialProperties, initialWeatherMap }: ClientFiltersProps) => {
  // Initialize filters state
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    tempRange: [-20, 50],
    humidityRange: [0, 100],
    selectedTags: [],
    condition: -1
  });

  // Update filters
  const updateFilters = (updates: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...updates }));
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      search: '',
      tempRange: [-20, 50],
      humidityRange: [0, 100],
      selectedTags: [],
      condition: -1
    });
  };

  // Filter properties based on current filters
  const filteredProperties = useMemo(() => {
    return filterProperties(initialProperties, filters, initialWeatherMap);
  }, [initialProperties, filters, initialWeatherMap]);

  const filteredCount = filteredProperties.length;

  return (
    <>
      <PropertyFilters
        filters={filters}
        onFiltersChange={updateFilters}
        allTags={PROPERTY_TAGS}
        resetFilters={resetFilters}
        filteredCount={filteredCount}
      />
      <PropertiesGrid 
        properties={filteredProperties} 
        weatherMap={initialWeatherMap} 
      />
    </>
  );
};
