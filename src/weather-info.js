import { weatherApiUrl, weatherApiKey } from './api';

const cityNameElement = document.getElementById('cityName');
const temperatureElement = document.getElementById('temperature');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('windSpeed');
const weatherDescriptionElement = document.getElementById('weatherDescription');
let timeShown = null;

// Weather info: Temperature, Local Time, Humidity, Wind Speed, Weather Description
async function updateWeatherInfo(cityName) {
  clearInterval(timeShown);

  const response = await fetch(
    `${weatherApiUrl}?q=${cityName}&appid=${weatherApiKey}&units=metric`
  );
  const result = await response.json();

  cityNameElement.textContent = `${result.name}, ${result.sys.country}`;
  temperatureElement.textContent = `${result.main.temp.toFixed(1)}°C`;
  humidityElement.innerHTML = `
    <i class="fa-solid fa-droplet"></i>
    <p>${result.main.humidity}%</p>
  `;
  windSpeedElement.innerHTML = `
    <i class="fa-solid fa-wind"></i>
    <p>${result.wind.speed} m/s</p>
  `;
  weatherDescriptionElement.innerHTML = result.weather[0].main;

  function updateLocalTime() {
    const localTimeElement = document.getElementById('localTime');
    localTimeElement.innerHTML = getLocalTime(result.timezone);
  }

  updateLocalTime();
  timeShown = setInterval(updateLocalTime, 1000);
}

// Getting Local Time and Timezone
function getLocalTime(timezoneOffset) {
  const currentTime = new Date();
  const localOffset = currentTime.getTimezoneOffset() * 60000;
  const cityOffset = timezoneOffset * 1000;
  const localTime = new Date(currentTime.getTime() + localOffset + cityOffset);

  const timeString = localTime.toLocaleTimeString('en-US');
  const timezone = getLocalTimezone(timezoneOffset);
  return `Local Time: <span id="currentTime">${timeString}</span>${timezone}`;
}

function getLocalTimezone(timezoneOffset) {
  const offsetHours = Math.abs(Math.floor(timezoneOffset / 3600));
  const offsetMinutes = Math.abs(Math.floor((timezoneOffset % 3600) / 60));
  const offsetSign = timezoneOffset >= 0 ? '+' : '-';
  return `GMT${offsetSign}${padZero(offsetHours)}:${padZero(offsetMinutes)}`;
}

// Helper function to pad zeroes
function padZero(number) {
  return number.toString().padStart(2, '0');
}

export { updateWeatherInfo };
