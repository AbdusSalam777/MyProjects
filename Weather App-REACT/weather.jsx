import React, { useState } from "react";

function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getData(city) {
    if (!city) return;

    setLoading(true);
    setError(null);

    try {
      const apikey = "99e684bd6ab3669ae3062c1cea5b9ece";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-screen h-screen flex">
      {/* Left Side - Search Section */}
      <div className="relative w-1/2 h-full">
        <img
          className="h-full w-full object-cover"
          src="/rain.jpg"
          alt="Weather background"
        />
        <div className="absolute inset-0 backdrop-blur-xs bg-white/10"></div>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && getData(city)}
          className="text-lg font-sans font-semibold text-white absolute top-1/2 left-1/2 outline-none transform -translate-x-1/2 -translate-y-1/2 p-3 w-2/3 text-center border-b-2 border-amber-50 bg-transparent placeholder-white/70"
        />
        <button
          onClick={() => getData(city)}
          className="absolute text-white top-[430px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-none rounded-xl p-3 w-[100px] border border-amber-50 active:scale-95 transition-all duration-200 hover:bg-white/10"
          disabled={loading}
        >
          {loading ? "..." : "Search"}
        </button>
      </div>

      {/* Right Side - Weather Display */}
      <div className="bg-slate-700 w-1/2 h-full flex items-center justify-center">
        {error ? (
          <div className="text-white text-center p-6">
            <p className="text-2xl font-bold text-amber-50 mb-4">Error</p>
            <p>{error}</p>
            <p className="mt-4">Please try another city</p>
          </div>
        ) : weatherData ? (
          <div className="text-white w-full max-w-md p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold">{weatherData.name}</h2>
                <p className="text-lg opacity-80">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-5xl font-bold">{weatherData.main.temp}°C</p>
                <p className="capitalize">
                  {weatherData.weather[0].description}
                </p>
              </div>
            </div>

            <div className="bg-slate-600/50 rounded-3xl p-10 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <WeatherDetail
                  label="Feels Like"
                  value={`${weatherData.main.feels_like}°C`}
                />
                <WeatherDetail
                  label="Humidity"
                  value={`${weatherData.main.humidity}%`}
                />
                <WeatherDetail
                  label="Wind Speed"
                  value={`${weatherData.wind.speed} m/s`}
                />
                <WeatherDetail
                  label="Pressure"
                  value={`${weatherData.main.pressure} hPa`}
                />
              </div>
            </div>

            <div className="flex justify-center">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                alt={weatherData.weather[0].description}
                className="h-32"
              />
            </div>
          </div>
        ) : (
          <div className="text-white/60 text-center p-6">
            <p className="text-2xl font-bold text-amber-50 mb-4">Weather App</p>
            <p>Search for a city to see the weather</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable weather detail component
function WeatherDetail({ label, value }) {
  return (
    <div>
      <p className="text-sm opacity-70">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}

export default Weather;
