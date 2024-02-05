import 'dotenv/config';
import { useState } from 'react';
import axios from 'axios';

export const useOpenWeather = () => {

  const [error, setError] = useState(null);
  const APIKey = process.env.APP_API_KEY;

  const searchWeatherByCityName = async (city, units) => {
    setError(null);

    try {
      if (units !== ''){
        await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${units}&appid=${APIKey}`);
        setError(null);
      } else {
        await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`);
        setError(null);
      }
    } catch (err) {
      setError(err.message);
    };
  };

  return {searchWeatherByCityName, error}
}
