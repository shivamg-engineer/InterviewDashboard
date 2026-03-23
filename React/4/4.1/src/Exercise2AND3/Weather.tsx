import { useEffect, useState } from "react";

interface WeatherData {
  temperature: number;
  windspeed: number;
}

const Weather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // const response = await fetch(
        //   "https://api.open-meteo.com/v1/forecast?latitude=28.61&longitude=77.20&current_weather=true"
        // );
        const response = await fetch(
          "https://ai.open-meteo.com/v1/forecast?latitude=28.61&longitude=77.20&current_weather=true"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();
        setWeather(data.current_weather);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []); // 👈 runs only once

  if (loading) return <p>Loading weather...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Current Weather</h2>
      <p>🌡 Temperature: {weather?.temperature}°C</p>
      <p>💨 Wind Speed: {weather?.windspeed} km/h</p>
    </div>
  );
};

export default Weather;
