"use client";
import PropertyWeatherCard from "@/components/PropertyWeatherCard";
import { useEffect, useState } from "react";

type Property = {
  id: number;
  name: string;
  city: string;
  state: string;
  country: string;
  lat: number;
  lng: number;
  tags?: string[];
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
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [condition, setCondition] = useState<number | null>(null);
  const allTags = Array.from(
    new Set([
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
      "parking",
    ])
  );
  useEffect(() => {
    fetch("http://localhost:5000/get-properties")
      .then((res) => res.json())
      .then((data) => {
        // Filter properties by selected tags
        const filteredByTags = selectedTags.length
          ? data.filter((p: Property) =>
              selectedTags.some((tag) => p?.tags?.includes(tag))
            )
          : data;

        console.log("Filtered properties:", filteredByTags);
        setProperties(filteredByTags);
      })
      .catch((err) => console.error("Failed to fetch properties:", err));
  }, [selectedTags]);

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
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex flex-col">
          <label htmlFor="min-temp" className="mb-1 font-medium">
            Min Temp (°C)
          </label>
          <input
            id="min-temp"
            type="number"
            value={tempRange[0]}
            onChange={(e) =>
              setTempRange([Number(e.target.value), tempRange[1]])
            }
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="max-temp" className="mb-1 font-medium">
            Max Temp (°C)
          </label>
          <input
            id="max-temp"
            type="number"
            value={tempRange[1]}
            onChange={(e) =>
              setTempRange([tempRange[0], Number(e.target.value)])
            }
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="min-humidity" className="mb-1 font-medium">
            Min Humidity (%)
          </label>
          <input
            id="min-humidity"
            type="number"
            value={humidityRange[0]}
            onChange={(e) =>
              setHumidityRange([Number(e.target.value), humidityRange[1]])
            }
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {allTags.map((tag) => (
            <label key={tag} className="flex items-center gap-1">
              <input
                type="checkbox"
                value={tag}
                checked={selectedTags.includes(tag)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedTags([...selectedTags, tag]);
                  } else {
                    setSelectedTags(selectedTags.filter((t) => t !== tag));
                  }
                }}
                className="accent-blue-500"
              />
              {tag}
            </label>
          ))}
        </div>

        <div className="flex flex-col">
          <label htmlFor="max-humidity" className="mb-1 font-medium">
            Max Humidity (%)
          </label>
          <input
            id="max-humidity"
            type="number"
            value={humidityRange[1]}
            onChange={(e) =>
              setHumidityRange([humidityRange[0], Number(e.target.value)])
            }
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="condition" className="mb-1 font-medium">
            Weather Condition
          </label>
          <select
            id="condition"
            value={condition ?? ""}
            onChange={(e) =>
              setCondition(
                e.target.value === "" ? null : Number(e.target.value)
              )
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
      </div>

      {/* Property cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <PropertyWeatherCard
            key={p.id}
            property={p}
            weather={weatherMap[p.id]}
          />
        ))}
      </div>
    </div>
  );
}
