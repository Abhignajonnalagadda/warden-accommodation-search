export const WEATHER_CONDITIONS = {
  ANY: {value: -1, label: 'Any Weather'},
  CLEAR: { value: 0, label: 'Clear' },
  CLOUDY: { value: 1, label: 'Cloudy' },
  DRIZZLE: { value: 51, label: 'Drizzle' },
  RAINY: { value: 61, label: 'Rainy' },
  SNOW: { value: 71, label: 'Snow' }
} as const;

export const TEMPERATURE_RANGE = {
  MIN: -20,
  MAX: 50
} as const;

export const HUMIDITY_RANGE = {
  MIN: 0,
  MAX: 100
} as const;

export const PROPERTY_TAGS = [
  "housekeeping",
  "pool", 
  "near-metro",
  "cafeteria",
  "premium",
  "laundry",
  "female-only",
  "pet-friendly",
  "wifi",
  "cctv",
  "budget",
  "gym",
  "power-backup",
  "cowork",
  "ac",
  "parking"
];

export const API_ENDPOINTS = {
  PROPERTIES: '/api/properties',  // Internal Next.js API route
  WEATHER: '/api/weather'         // Internal Next.js API route
} as const;

// Keep the external weather API for reference (we might use it directly in some cases)
export const WEATHER_API_BASE = 'https://api.open-meteo.com/v1/forecast';
