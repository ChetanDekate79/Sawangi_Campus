// src/Weather.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          'http://api.weatherapi.com/v1/current.json?key=f792813bccb848a6ad672008232511&q=wardha&aqi=no'
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError(error.message || 'An error occurred while fetching weather data.');
      } finally {
        setLoading(false);
      }
    };

    getWeatherData();
  }, []); // The empty dependency array ensures that the effect runs only once on component mount

  return (
    <div>
      <h2>Weather App</h2>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weatherData && (
        <div>
          <h3>{weatherData.location.name}, {weatherData.location.country}</h3>
          <p>Temperature: {weatherData.current.temp_c} °C</p>
          <p>Weather: {weatherData.current.condition.text}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
