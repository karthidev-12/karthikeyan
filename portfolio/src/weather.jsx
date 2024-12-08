import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const Weather = () => {
  const [city, setCity] = useState('London');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('metric'); // Add unit toggle (metric or imperial)

  const fetchWeather = async (city) => {
    setLoading(true);
    setError('');
    try {
      const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`
      );
      setWeatherData(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('Could not fetch weather data. Please try again.');
    }
  };

  // Use geolocation to automatically get the user's city on load
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(`${latitude},${longitude}`);
      },
      (err) => {
        console.error("Error fetching location", err);
        fetchWeather('London'); // Default to London if geolocation fails
      }
    );
  }, []);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      fetchWeather(city);
    }
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
  };

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div className="App">
      <div className="weather-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            placeholder="Enter city"
            required
          />
          <button type="submit">Get Weather</button>
        </form>
        <button onClick={toggleUnit}>
          {unit === 'metric' ? 'Switch to °F' : 'Switch to °C'}
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weatherData && (
        <div className="weather-card">
          <h2>
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <img
            src={getWeatherIcon(weatherData.weather[0].icon)}
            alt={weatherData.weather[0].description}
          />
          <p>{weatherData.weather[0].description}</p>
          <h3>
            {weatherData.main.temp}°{unit === 'metric' ? 'C' : 'F'}
          </h3>
          <div>
            <p>Feels Like: {weatherData.main.feels_like}°{unit === 'metric' ? 'C' : 'F'}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</p>
            <p>Pressure: {weatherData.main.pressure} hPa</p>
            <p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
            <p>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
