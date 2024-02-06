import { useState } from 'react';
import axios from 'axios';

export const useOpenWeather = () => {

  const [error, setError] = useState(null);
  const [data, setData] = useState('');
  const APIKey = '086194c2daa42405db72f49319d70778';

  const searchWeatherByCityName = async (city, units) => {
    setError(null);

    try {
      if (units !== ''){
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${APIKey}`);
        setData(response.data);
        setError(null);
      } else {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`);
        setData(response.data);
        setError(null);
      }
    } catch (err) {
      setError(err.message);
    };
  };

  const reset = () => {
    setData('');
  };

  return {searchWeatherByCityName, reset, error, data}
}
