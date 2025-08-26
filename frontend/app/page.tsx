"use client";

import { useEffect, useState } from "react";

type Property = {
  id: number;
  name: string;
  city: string;
  state: string;
  country: string;
  lat: number;
  lng: number;
};

type Weather = {
  temperature: number;
  humidity: number;
  weathercode: number;
};

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [weatherMap, setWeatherMap] = useState<Record<number, Weather>>({});
  const [search, setSearch] = useState("");
  const [tempRange, setTempRange] = useState<[number, number]>([-20, 50]);
  const [humidityRange, setHumidityRange] = useState<[number, number]>([
    0, 100,
  ]);
  const [condition, setCondition] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/get-properties")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched properties:", data);
        setProperties(data);
      })
      .catch((err) => console.error("Failed to fetch properties:", err));
  }, []);

  // Fetch weather for each property
  useEffect(() => {
    properties.forEach((p) => {
      if (!weatherMap[p.id]) {
        fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${p.lat}&longitude=${p.lng}&current_weather=true&hourly=relativehumidity_2m`
        )
          .then((res) => res.json())
          .then((data) => {
            console.log("Weather fetched for", p.id, data);
            setWeatherMap((prev) => ({
              ...prev,
              [p.id]: {
                temperature: data.current_weather.temperature,
                humidity: data.hourly.relativehumidity_2m[0],
                weathercode: data.current_weather.weathercode,
              },
            }));
          })
          .catch((err) => console.error(err));
      }
    });
  }, [properties]);

  // Filtered properties
  const filtered = properties.filter((p) => {
    const w = weatherMap[p.id];
    if (!w) return true;
    return (
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      w.temperature >= tempRange[0] &&
      w.temperature <= tempRange[1] &&
      w.humidity >= humidityRange[0] &&
      w.humidity <= humidityRange[1] &&
      (condition === null || w.weathercode === condition)
    );
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Property Search</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <input
          type="number"
          placeholder="Min Temp"
          value={tempRange[0]}
          onChange={(e) => setTempRange([Number(e.target.value), tempRange[1]])}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Max Temp"
          value={tempRange[1]}
          onChange={(e) => setTempRange([tempRange[0], Number(e.target.value)])}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Min Humidity"
          value={humidityRange[0]}
          onChange={(e) =>
            setHumidityRange([Number(e.target.value), humidityRange[1]])
          }
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Max Humidity"
          value={humidityRange[1]}
          onChange={(e) =>
            setHumidityRange([humidityRange[0], Number(e.target.value)])
          }
          className="border p-2 rounded"
        />
        <select
          value={condition ?? ""}
          onChange={(e) =>
            setCondition(e.target.value === "" ? null : Number(e.target.value))
          }
          className="border p-2 rounded"
        >
          <option value="">Any Weather</option>
          <option value={0}>Clear</option>
          <option value={1}>Cloudy</option>
          <option value={51}>Drizzle</option>
          <option value={61}>Rainy</option>
          <option value={71}>Snow</option>
        </select>
      </div>

      {/* Property cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <div key={p.id} className="border p-4 rounded shadow">
            <h2 className="font-bold">{p.name}</h2>
            <p>
              {p.city}, {p.state}, {p.country}
            </p>
            {weatherMap[p.id] ? (
              <p>
                Temp: {weatherMap[p.id].temperature}°C, Humidity:{" "}
                {weatherMap[p.id].humidity}%, Code:{" "}
                {weatherMap[p.id].weathercode}
              </p>
            ) : (
              <p>Loading weather...</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
