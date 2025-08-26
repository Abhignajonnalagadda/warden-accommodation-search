export interface Property {
  id: number;
  name: string;
  city: string;
  state: string;
  country: string;
  lat: number;
  lng: number;
  geohash5: string;
  isActive: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Weather {
  temperature: number;
  humidity: number;
  weathercode: number;
}

export interface FilterState {
  search: string;
  tempRange: [number, number];
  humidityRange: [number, number];
  selectedTags: string[];
  condition: number | null;
}

export interface PropertyFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: Partial<FilterState>) => void;
  allTags: string[];
}

export interface PropertyWeatherCardProps {
  property: Property;
  weather?: Weather;
}

export interface UsePropertiesReturn {
  properties: Property[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseFiltersReturn {
  filters: FilterState;
  updateFilters: (updates: Partial<FilterState>) => void;
  resetFilters: () => void;
  filteredProperties: Property[];
  filteredCount: number;
}
