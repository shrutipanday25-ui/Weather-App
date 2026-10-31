
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function Weather() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [city, setCity] = useState("Pune");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          setWeather(data.results[0]);
        } else {
          setWeather(null);
        }
      })
      .catch((error) => console.log(error));
  }, [city]);

  return (
    <div className={theme}>
      <h1>Weather App </h1>

      <button onClick={toggleTheme}>
        Change Theme
      </button>

      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />

      {weather ? (
        <div>
          <h2>{weather.name}</h2>
          <p>Country: {weather.country}</p>
          <p>Latitude: {weather.latitude}</p>
          <p>Longitude: {weather.longitude}</p>
        </div>
      ) : (
        <p>City not found</p>
      )}
    </div>
  );
}

export default Weather;
