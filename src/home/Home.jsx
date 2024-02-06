import { useState } from 'react';
import { useOpenWeather } from '../hooks/useOpenWeather';
import moment from 'moment';

import styles from './Home.module.css';

export default function Home() {

    const [city, setCity] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [units, setUnits] = useState('');
    const [selectedLang, setSelectedLang] = useState('');
    const { searchWeatherByCityName, searchWeatherByCityAndCountryCode, error, data, reset } = useOpenWeather();
    const timezoneOffsetInHours = data.timezone / 3600;

    const supportedLangs = [
        {lang_code: 'af', displayText: 'Afrikaans'},
        {lang_code: 'al', displayText: 'Albanian'},
        {lang_code: 'ar', displayText: 'Arabic'},
        {lang_code: 'az', displayText: 'Azerbaijani'},
        {lang_code: 'bg', displayText: 'Bulgarian'},
        {lang_code: 'ca', displayText: 'Catalan'},
        {lang_code: 'cz', displayText: 'Czech'},
        {lang_code: 'da', displayText: 'Danish'},
        {lang_code: 'de', displayText: 'German'},
        {lang_code: 'el', displayText: 'Greek'},
        {lang_code: 'en', displayText: 'English'},
        {lang_code: 'eu', displayText: 'Basque'},
        {lang_code: 'fa', displayText: 'Persian (Farsi)'},
        {lang_code: 'fi', displayText: 'Finnish'},
        {lang_code: 'fr', displayText: 'French'},
        {lang_code: 'gl', displayText: 'Galician'},
        {lang_code: 'he', displayText: 'Hebrew'},
        {lang_code: 'hi', displayText: 'Hindi'},
        {lang_code: 'hr', displayText: 'Croatian'},
        {lang_code: 'hu', displayText: 'Hungarian'},
        {lang_code: 'id', displayText: 'Indonesian'},
        {lang_code: 'it', displayText: 'Italian'},
        {lang_code: 'ja', displayText: 'Japanese'},
        {lang_code: 'kr', displayText: 'Korean'},
        {lang_code: 'la', displayText: 'Latvian'},
        {lang_code: 'lt', displayText: 'Lithuanian'},
        {lang_code: 'mk', displayText: 'Macedonian'},
        {lang_code: 'no', displayText: 'Norwegian'},
        {lang_code: 'nl', displayText: 'Dutch'},
        {lang_code: 'pl', displayText: 'Polish'},
        {lang_code: 'pt', displayText: 'Portuguese'},
        {lang_code: 'br', displayText: 'Português Brasil'},
        {lang_code: 'ro', displayText: 'Romanian'},
        {lang_code: 'ru', displayText: 'Russian'},
        {lang_code: 'se', displayText: 'Swedish'},
        {lang_code: 'sk', displayText: 'Slovak'},
        {lang_code: 'sl', displayText: 'Slovenian'},
        {lang_code: 'es', displayText: 'Spanish'},
        {lang_code: 'sr', displayText: 'Serbian'},
        {lang_code: 'th', displayText: 'Thai'},
        {lang_code: 'tr', displayText: 'Turkish'},
        {lang_code: 'uk', displayText: 'Ukrainian'},
        {lang_code: 'vi', displayText: 'Vietnamese'},
        {lang_code: 'cn', displayText: 'Chinese Simplified'},
        {lang_code: 'tw', displayText: 'Chinese Traditional'},
        {lang_code: 'zu', displayText: 'Zulu'}
    ];

    const handleSubmit = async event => {
        event.preventDefault();
        if (city !== '' && countryCode !== ''){
            await searchWeatherByCityAndCountryCode(city, countryCode, units, selectedLang);
        } else {
            await searchWeatherByCityName(city,units, selectedLang);
        };
    };

    const handleReset = (event) => {
        event.preventDefault();
        setCity('');
        setCountryCode('');
        setUnits('');
        setSelectedLang('');
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
                        <option value="standard" selected>Default(Kelvin)</option>
                        <option value="metric">Celsius</option>
                        <option value="imperial">Fahrenheit</option>
                    </select>
                </label>
                <label>
                    NOTE: This will only translate the description of the weather
                    <select id="supported-langs" onChange={event => setSelectedLang(event.target.value)} value={selectedLang || 'en'}>
                        {supportedLangs.map(lang => (
                            <option value={lang.lang_code}>{lang.displayText}</option>
                        ))}
                    </select>
                </label>
                <button type='submit'>Submit</button>
            </>
            )}
            {data && (
                <div>
                    <h2>{data.name}, {data.sys.country}</h2>
                    <div className={styles['temperatures']}>
                        <p>Currently: {data.weather[0].description}</p>
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
