"use client";

import { FilterState, PropertyFiltersProps } from "@/types";
import {
  WEATHER_CONDITIONS,
  TEMPERATURE_RANGE,
  HUMIDITY_RANGE,
} from "@/constants";
import { useState, useEffect, useRef } from "react";

export const PropertyFilters = ({
  filters,
  onFiltersChange,
  allTags,
}: PropertyFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAmenitiesOpen, setIsAmenitiesOpen] = useState(false);
  const amenitiesRef = useRef<HTMLDivElement>(null);

  const handleFilterChange = (updates: Partial<FilterState>) => {
    onFiltersChange(updates);
  };

  const selectedTagsCount = filters.selectedTags.length;

  // Close amenities dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        amenitiesRef.current &&
        !amenitiesRef.current.contains(event.target as Node)
      ) {
        setIsAmenitiesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Search & Filters</h2>
        </div>
        <div className="flex items-center space-x-4">
          {/* Active Filters Counter */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg  p-2">
            <div className="flex items-center space-x-2">
              <div className="rounded-full">
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-blue-800">
                  {
                    [
                      filters.search,
                      filters.selectedTags.length > 0,
                      filters.condition !== null && filters.condition !== -1,
                      filters.tempRange[0] !== TEMPERATURE_RANGE.MIN ||
                        filters.tempRange[1] !== TEMPERATURE_RANGE.MAX,
                      filters.humidityRange[0] !== HUMIDITY_RANGE.MIN ||
                        filters.humidityRange[1] !== HUMIDITY_RANGE.MAX,
                    ].filter(Boolean).length
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors"
          >
            {isExpanded ? "Hide" : "Show"} Filters
          </button>
        </div>
      </div>

      <div className={`space-y-6 ${isExpanded ? "block" : "hidden lg:block"}`}>
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search accommodations by name..."
            value={filters.search}
            onChange={(e) => handleFilterChange({ search: e.target.value })}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:shadow-lg focus:shadow-blue-100 text-lg transition-all duration-200 text-gray-700"
            name="search"
          />
        </div>

        {/* Weather Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Temperature Range */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              🌡️ Temperature Range (°C)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="number"
                  min={TEMPERATURE_RANGE.MIN}
                  max={TEMPERATURE_RANGE.MAX}
                  value={filters.tempRange[0]}
                  onChange={(e) =>
                    handleFilterChange({
                      tempRange: [Number(e.target.value), filters.tempRange[1]],
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:shadow-md focus:shadow-blue-100 transition-all bg-white text-gray-700"
                />
              </div>
              <div>
                <input
                  type="number"
                  min={TEMPERATURE_RANGE.MIN}
                  max={TEMPERATURE_RANGE.MAX}
                  value={filters.tempRange[1]}
                  onChange={(e) =>
                    handleFilterChange({
                      tempRange: [filters.tempRange[0], Number(e.target.value)],
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:shadow-md focus:shadow-blue-100 transition-all bg-white text-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Humidity Range */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              💧 Humidity Range (%)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="number"
                  min={HUMIDITY_RANGE.MIN}
                  max={HUMIDITY_RANGE.MAX}
                  value={filters.humidityRange[0]}
                  onChange={(e) =>
                    handleFilterChange({
                      humidityRange: [
                        Number(e.target.value),
                        filters.humidityRange[1],
                      ],
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:shadow-md focus:shadow-blue-100 transition-all bg-white text-gray-700"
                />
              </div>
              <div>
                <input
                  type="number"
                  min={HUMIDITY_RANGE.MIN}
                  max={HUMIDITY_RANGE.MAX}
                  value={filters.humidityRange[1]}
                  onChange={(e) =>
                    handleFilterChange({
                      humidityRange: [
                        filters.humidityRange[0],
                        Number(e.target.value),
                      ],
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:shadow-md focus:shadow-blue-100 transition-all bg-white text-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Weather Condition */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              🌤️ Weather Condition
            </label>
            <select
              value={filters.condition}
              onChange={(e) => {
                const value = e.target.value;
                const conditionValue = value ? Number(value) : -1;
                handleFilterChange({
                  condition: conditionValue,
                });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:shadow-md focus:shadow-blue-100 transition-all bg-white text-gray-700"
            >
              <option value="-1">Any Weather</option>
              <option value={WEATHER_CONDITIONS.CLEAR.value}>
                ☀️ {WEATHER_CONDITIONS.CLEAR.label}
              </option>
              <option value={WEATHER_CONDITIONS.CLOUDY.value}>
                ☁️ {WEATHER_CONDITIONS.CLOUDY.label}
              </option>
              <option value={WEATHER_CONDITIONS.DRIZZLE.value}>
                🌦️ {WEATHER_CONDITIONS.DRIZZLE.label}
              </option>
              <option value={WEATHER_CONDITIONS.RAINY.value}>
                🌧️ {WEATHER_CONDITIONS.RAINY.label}
              </option>
              <option value={WEATHER_CONDITIONS.SNOW.value}>
                ❄️ {WEATHER_CONDITIONS.SNOW.label}
              </option>
            </select>
          </div>

          {/* Amenities Dropdown */}
          <div className="space-y-3 relative" ref={amenitiesRef}>
            <label className="block text-sm font-semibold text-gray-700">
              🏷️ Amenities
            </label>
            <button
              onClick={() => setIsAmenitiesOpen(!isAmenitiesOpen)}
              className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left bg-white"
            >
              <span className="text-sm text-gray-700">
                {selectedTagsCount > 0
                  ? `${selectedTagsCount} selected`
                  : "Select amenities"}
                {selectedTagsCount > 0 && (
                  <span className="ml-2 bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                    {selectedTagsCount}
                  </span>
                )}
              </span>
              <svg
                className={`w-4 h-4 text-gray-500 transition-transform ${
                  isAmenitiesOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Amenities Checklist */}
            {isAmenitiesOpen && (
              <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl p-4 max-h-64 overflow-y-auto">
                <div className="grid grid-cols-2 gap-2">
                  {allTags.map((tag) => (
                    <label
                      key={tag}
                      className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                    >
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
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 transition-all"
                      />
                      <span className="text-sm text-gray-700 capitalize">
                        {tag.replace("-", " ")}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Clear Selection Button */}
                {selectedTagsCount > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <button
                      onClick={() => handleFilterChange({ selectedTags: [] })}
                      className="w-full text-sm text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded transition-colors"
                    >
                      🗑️ Clear All Amenities
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
