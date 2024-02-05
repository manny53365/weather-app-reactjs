import { useState } from 'react';
import { useOpenWeather } from '../hooks/useOpenWeather';

import styles from './Home.module.css';

export default function Home() {

    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [units, setUnits] = useState('');
    const { searchWeatherByCityName, error, data, reset } = useOpenWeather();

    const handleSubmit = async event => {
        event.preventDefault();
        await searchWeatherByCityName(city,units);
    };

    const handleReset = (event) => {
        event.preventDefault();
        setCity('');
        setState('');
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
                    <input type="text" placeholder='Enter State Code:' onChange={event => setState(event.target.value)} value={state} />
                </label>
                <label>
                    <input type="text" placeholder='Enter Country Code:' onChange={event => setCountryCode(event.target.value)} value={countryCode} />
                </label>
                <label>
                    Select a unit of measurement:
                    <select id="units" required onChange={event => setUnits(event.target.value)} value={units}>
                        <option value="">---MAKE A SELECTION---</option>
                        <option value="metric">Celsius</option>
                        <option value="imperial">Fahrenheit</option>
                    </select>
                </label>
                <button type='submit'>Submit</button>
            </>
            )}
            {data && (
                <div>
                    <h2>{data.name}</h2>
                    <div className={styles['temperatures']}>
                        <p>Current Temp: {Math.round(data.main.feels_like)}°{units === 'metric' ? 'C' : units === 'imperial' ? 'F': 'K'}</p>
                        <p>Feels Like: {Math.round(data.main.temp)}°{units === 'metric' ? 'C' : units === 'imperial' ? 'F': 'K'}</p>
                        <p>High: {Math.round(data.main.temp_max)}°{units === 'metric' ? 'C' : units === 'imperial' ? 'F': 'K'}</p>
                        <p>Humidity: {Math.round(data.main.humidity)}</p>
                    </div>
                    <div className={'wind-speeds'}>
                        <p>Wind Speed: {data.wind.speed}</p>
                    </div>
                    <div style={styles['sun-info']}>
                        <p>Sunrise: {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
                        <p>Sunset: {new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
                    </div>
                    <button type='submit' onClick={handleReset}>Search again</button>
                </div>
            )}
            {error && <p>{error}</p>}
        </form>
    </div>
  )
}
