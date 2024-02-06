import { useState } from 'react';
import { useOpenWeather } from '../hooks/useOpenWeather';
import moment from 'moment';

import styles from './Home.module.css';

export default function Home() {

    const [city, setCity] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [units, setUnits] = useState('');
    const { searchWeatherByCityName, searchWeatherByCityAndCountryCode, error, data, reset } = useOpenWeather();
    const timezoneOffsetInHours = data.timezone / 3600;

    const handleSubmit = async event => {
        event.preventDefault();
        if (city !== '' && countryCode !== ''){
            await searchWeatherByCityAndCountryCode(city, countryCode, units);
        } else {
            await searchWeatherByCityName(city,units);
        };
    };

    const handleReset = (event) => {
        event.preventDefault();
        setCity('');
        setCountryCode('');
        setUnits('');
        reset();
    };

  return (
    <div>
        <h1>Weather App</h1>
        <form className={styles['user-input-form']} onSubmit={handleSubmit}>
            {!data && (
            <>
                <label>
                    <input type="text" placeholder='Enter City Name*' required onChange={event => setCity(event.target.value)} value={city}/>
                </label>
                <label>
                    <input type="text" placeholder='Enter Country Code (ex: US or USA)' onChange={event => setCountryCode(event.target.value)} value={countryCode} />
                </label>
                <label>
                    <select id="units" required onChange={event => setUnits(event.target.value)} value={units}>
                        <option value="">---SELECT A UNIT OF MEASUREMENT---</option>
                        <option value="metric">Celsius</option>
                        <option value="imperial">Fahrenheit</option>
                    </select>
                </label>
                <button type='submit'>Submit</button>
            </>
            )}
            {data && (
                <div>
                    <h2>{data.name}, {data.sys.country}</h2>
                    <div className={styles['temperatures']}>
                        <p>Current Temp: {Math.round(data.main.feels_like)}°{units === 'metric' ? 'C' : units === 'imperial' ? 'F': 'K'}</p>
                        <p>Feels Like: {Math.round(data.main.temp)}°{units === 'metric' ? 'C' : units === 'imperial' ? 'F': 'K'}</p>
                        <p>Low: {Math.round(data.main.temp_min)}°{units === 'metric' ? 'C' : units === 'imperial' ? 'F': 'K'}</p>
                        <p>High: {Math.round(data.main.temp_max)}°{units === 'metric' ? 'C' : units === 'imperial' ? 'F': 'K'}</p>
                        <p>Humidity: {Math.round(data.main.humidity)}</p>
                    </div>
                    <div className={styles['wind-speeds']}>
                        <p>Wind Speed: {data.wind.speed}</p>
                    </div>
                    <div className={styles['sun-info']}>
                        <p>Sunrise: {moment.unix(data.sys.sunrise).utcOffset(timezoneOffsetInHours).format('HH:mm:ss')}</p>
                        <p>Sunset: {moment.unix(data.sys.sunset).utcOffset(timezoneOffsetInHours).format('HH:mm:ss')}</p>
                    </div>
                    <button type='submit' onClick={handleReset}>Search again</button>
                </div>
            )}
            {error && <p>{error}</p>}
        </form>
    </div>
  )
}
