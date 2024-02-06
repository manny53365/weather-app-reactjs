# Weather App
This is a single page sample weather app that checks the weather of the specified location.

## How it works
The end user can search by city name alone or they can also include a country code like `US` for "United States", for example.

The front end has fields for the following items
- City Name
- Country
- Metric Units
- Preferred Language

The end user will input the information they want to search by and then using the pieces of state the items above are sent to the Open Weather API using a custom `useOpenWeather` hook. This custom hook is responsible sending the axios requests based on the data that was passed. The app has conditional rendering of elements based on if `data` is present or not.

NOTE: The language field will only translate the `description` field in the response object returned from the Open Weather API. 

### Technologies used
- ReactJS
- CSS
- Axios
- Moment
- Firebase
- Font Awesome

