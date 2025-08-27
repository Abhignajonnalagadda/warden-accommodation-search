export interface Property {
  id: number;
  name: string;
  city: string | null;
  state: string | null;
  country: string | null;
  lat: number | null;
  lng: number | null;
  geohash5: string | null;
  isActive: boolean;
  tags: any; // JsonValue from Prisma
  createdAt: Date;
  updatedAt: Date;
}

export interface Weather {
  temperature: number;
  humidity: number;
  weathercode: number;
  condition: string;
}

export interface FilterState {
  search: string;
  tempRange: [number, number];
  humidityRange: [number, number];
  selectedTags: string[];
  condition: number;
}

export interface PropertyFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: Partial<FilterState>) => void;
  allTags: string[];
  resetFilters: () => void;
  filteredCount: number;
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
