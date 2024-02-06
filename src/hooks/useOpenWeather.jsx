import { useState } from 'react';
import axios from 'axios';

export const useOpenWeather = () => {

  const [error, setError] = useState(null);
  const [data, setData] = useState('');
  const APIKey = '086194c2daa42405db72f49319d70778';

  const toTitleCase = (str) => {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  const searchWeatherByCityName = async (city, units, lang) => {
    setError(null);

    city = city.trim();

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&lang=${lang}&appid=${APIKey}`);
      response.data.weather[0].description = toTitleCase(response.data.weather[0].description);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    };
  };

  const reset = () => {
    setData('');
  };

  const searchWeatherByCityAndCountryCode = async (city, country, units, lang) => {
    setError(null);

    city = city.trim();
    country = country.trim();

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&lang=${lang}&units=${units}&appid=${APIKey}`);
      response.data.weather[0].description = toTitleCase(response.data.weather[0].description);
      setData(response.data);
      setError(null);
    } catch (err){
      setError(err.message);
    }
  }

  return {searchWeatherByCityName, searchWeatherByCityAndCountryCode, reset, error, data}
}
