"use client";

import { FilterState, PropertyFiltersProps } from '@/types';
import { WEATHER_CONDITIONS, TEMPERATURE_RANGE, HUMIDITY_RANGE } from '@/constants';

export const PropertyFilters = ({
  filters,
  onFiltersChange,
  allTags
}: PropertyFiltersProps) => {
  const handleFilterChange = (updates: Partial<FilterState>) => {
    onFiltersChange(updates);
  };

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      {/* Search input */}
      <input
        type="text"
        placeholder="Search by name"
        value={filters.search}
        onChange={(e) => handleFilterChange({ search: e.target.value })}
        className="border p-2 rounded w-full mb-4"
      />

      {/* Temperature inputs */}
      <div className="flex flex-col">
        <label>Min Temp (°C)</label>
        <input
          type="number"
          min={TEMPERATURE_RANGE.MIN}
          max={TEMPERATURE_RANGE.MAX}
          value={filters.tempRange[0]}
          onChange={(e) => handleFilterChange({ 
            tempRange: [Number(e.target.value), filters.tempRange[1]] 
          })}
          className="border p-2 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label>Max Temp (°C)</label>
        <input
          type="number"
          min={TEMPERATURE_RANGE.MIN}
          max={TEMPERATURE_RANGE.MAX}
          value={filters.tempRange[1]}
          onChange={(e) => handleFilterChange({ 
            tempRange: [filters.tempRange[0], Number(e.target.value)] 
          })}
          className="border p-2 rounded"
        />
      </div>

      {/* Humidity inputs */}
      <div className="flex flex-col">
        <label>Min Humidity (%)</label>
        <input
          type="number"
          min={HUMIDITY_RANGE.MIN}
          max={HUMIDITY_RANGE.MAX}
          value={filters.humidityRange[0]}
          onChange={(e) =>
            handleFilterChange({ 
              humidityRange: [Number(e.target.value), filters.humidityRange[1]] 
            })
          }
          className="border p-2 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label>Max Humidity (%)</label>
        <input
          type="number"
          min={HUMIDITY_RANGE.MIN}
          max={HUMIDITY_RANGE.MAX}
          value={filters.humidityRange[1]}
          onChange={(e) =>
            handleFilterChange({ 
              humidityRange: [filters.humidityRange[0], Number(e.target.value)] 
            })
          }
          className="border p-2 rounded"
        />
      </div>

      {/* Tag filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {allTags.map((tag) => (
          <label key={tag} className="flex items-center gap-1">
            <input
              type="checkbox"
              value={tag}
              checked={filters.selectedTags.includes(tag)}
              onChange={(e) => {
                const newTags = e.target.checked
                  ? [...filters.selectedTags, tag]
                  : filters.selectedTags.filter((t) => t !== tag);
                handleFilterChange({ selectedTags: newTags });
              }}
              className="accent-blue-500"
            />
            {tag}
          </label>
        ))}
      </div>

      {/* Weather condition select */}
      <div className="flex flex-col">
        <label>Weather Condition</label>
        <select
          value={filters.condition ?? ""}
          onChange={(e) =>
            handleFilterChange({ 
              condition: e.target.value === "" ? null : Number(e.target.value) 
            })
          }
          className="border p-2 rounded"
        >
          <option value="">Any Weather</option>
          <option value={WEATHER_CONDITIONS.CLEAR.value}>
            {WEATHER_CONDITIONS.CLEAR.label}
          </option>
          <option value={WEATHER_CONDITIONS.CLOUDY.value}>
            {WEATHER_CONDITIONS.CLOUDY.label}
          </option>
          <option value={WEATHER_CONDITIONS.DRIZZLE.value}>
            {WEATHER_CONDITIONS.DRIZZLE.label}
          </option>
          <option value={WEATHER_CONDITIONS.RAINY.value}>
            {WEATHER_CONDITIONS.RAINY.label}
          </option>
          <option value={WEATHER_CONDITIONS.SNOW.value}>
            {WEATHER_CONDITIONS.SNOW.label}
          </option>
        </select>
      </div>
    </div>
  );
};
