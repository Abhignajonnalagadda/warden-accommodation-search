"use client";

import { useProperties } from '@/hooks/useProperties';
import { useFilters } from '@/hooks/useFilters';
import { useWeather } from '@/hooks/useWeather';
import { Header } from '@/components/Header';
import { PropertyFilters } from '@/components/PropertyFilters';
import { PropertiesGrid } from '@/components/PropertiesGrid';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { PROPERTY_TAGS } from '@/constants';

export default function Home() {
  // Fetch accommodations data
  const { properties, loading, error, refetch } = useProperties();
  
  // Get weather data for accommodations
  const weatherMap = useWeather(properties);
  
  // Handle filtering logic
  const { 
    filters, 
    updateFilters, 
    resetFilters, 
    filteredProperties, 
    filteredCount 
  } = useFilters(properties, weatherMap);

  // Loading state
  if (loading) {
    return <LoadingState />;
  }

  // Error state
  if (error) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <PropertyFilters
          filters={filters}
          onFiltersChange={updateFilters}
          allTags={PROPERTY_TAGS}
          resetFilters={resetFilters}
          filteredCount={filteredCount}
        />
        <PropertiesGrid 
          properties={filteredProperties} 
          weatherMap={weatherMap} 
        />
      </div>
    </div>
  );
}
