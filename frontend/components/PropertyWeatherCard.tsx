// components/PropertyWeatherCard.tsx
"use client";

type Property = {
  id: number;
  name: string;
  city: string;
  state: string;
  country: string;
};

type Weather = {
  temperature: number;
  humidity: number;
  weathercode: number;
};

type Props = {
  property: Property;
  weather?: Weather;
};

export default function PropertyWeatherCard({ property, weather }: Props) {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="font-bold">{property.name}</h2>
      <p>
        {property.city}, {property.state}, {property.country}
      </p>
      {weather ? (
        <p>
          Temp: {weather.temperature}°C, Humidity: {weather.humidity}%, Code:{" "}
          {weather.weathercode}
        </p>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
}
