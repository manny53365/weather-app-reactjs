import { useState } from 'react';

import styles from './Home.module.css';

export default function Home() {

    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [units, setUnits] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        console.log('I was submitted');
        console.log(city, state, countryCode, units);
    };

  return (
    <form className={styles['user-input-form']} onSubmit={handleSubmit}>
        <h2>Weather App</h2>
        <label>
            City Name:
            <input type="text" placeholder='Enter City Name*' required onChange={event => setCity(event.target.value)} value={city}/>
        </label>
        <label>
            State Code:
            <input type="text" placeholder='Enter State Code:' onChange={event => setState(event.target.value)} value={state} />
        </label>
        <label>
            Country Code:
            <input type="text" placeholder='Enter Country Code:' onChange={event => setCountryCode(event.target.value)} value={countryCode} />
        </label>
        <label>
            <select id="units" required onChange={event => setUnits(event.target.value)} value={units}>
                <option value="">---MAKE A SELECTION---</option>
                <option value="metric">Celsius</option>
                <option value="imperial">Fahrenheit</option>
            </select>
        </label>
        <button type='submit'>Submit</button>
    </form>
  )
}
