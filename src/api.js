const cityApiUrl = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';
const cityApiOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_CITY_API_KEY,
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  },
};
const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;

export { cityApiUrl, cityApiOptions, weatherApiUrl, weatherApiKey };
