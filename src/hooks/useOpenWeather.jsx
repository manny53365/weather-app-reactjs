import { useState } from 'react';
import axios from 'axios';

export const useOpenWeather = () => {

  const [error, setError] = useState(null);
  const [data, setData] = useState('');
  const APIKey = '086194c2daa42405db72f49319d70778';

  const searchWeatherByCityName = async (city, units) => {
    setError(null);

    city = city.trim();

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${APIKey}`);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    };
  };

  const reset = () => {
    setData('');
  };

  const searchWeatherByCityAndCountryCode = async (city, country, units) => {
    setError(null);

    city = city.trim();
    country = country.trim();

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=${units}&appid=${APIKey}`);
      setData(response.data);
      setError(null);
    } catch (err){
      setError(err.message);
    }
  }

  return {searchWeatherByCityName, searchWeatherByCityAndCountryCode, reset, error, data}
}
