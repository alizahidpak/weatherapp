import latinize from 'latinize';
import { cityApiUrl, cityApiOptions, weatherApiKey, weatherApiUrl } from './api';
import { updateWeatherInfo } from './weather-info';

const inputField = document.getElementById('cityInput');
const dropdownList = document.getElementById('cityDropdown');
const appContainer = document.getElementById('app');

let delayTimer = null;

// Handle the input event on the dropdown list
async function handleInput(event) {
  clearTimeout(delayTimer);
  const cityName = event.target.value;
  dropdownList.innerHTML = '<li>Fetching data, please wait...</li>';

  if (cityName.length > 0) {
    delayTimer = setTimeout(async () => {
      const cityData = await fetchCityData(cityName);
      updateDropdown(cityData);
    }, 1000);
  } else {
    dropdownList.innerHTML = '';
  }
}

// Fetch city data from the API
async function fetchCityData(cityName) {
  const response = await fetch(
    `${cityApiUrl}?namePrefix=${cityName}&limit=10&sort=-population`,
    cityApiOptions
  );
  const result = await response.json();
  return result.data || [];
}

// Filter the city data by checking if the city exists in the weather API and sort it by population
async function filterApi(cityData) {
  const filteredData = [];

  for (const city of cityData) {
    try {
      const response = await fetch(
        `${weatherApiUrl}?q=${city.city}&appid=${weatherApiKey}&units=metric`
      );
      const result = await response.json();
      if (result.cod === 200) {
        filteredData.push(city);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return filteredData.sort((a, b) => b.population - a.population);
}

// Update the dropdown list with the city data
async function updateDropdown(cityData) {
  const resultCityData = await filterApi(cityData);

  dropdownList.innerHTML = '';

  // If there are no matching cities, display a message
  if (resultCityData.length === 0) {
    dropdownList.innerHTML = '<li>No results found.</li>';
    return;
  }

  // Populate the dropdown list with the filtered city data
  const cityName = inputField.value.toLowerCase(); // Get lowercase input value
  resultCityData.forEach((city) => {
    const listItem = document.createElement('li');
    const cityText = `${city.city}, ${city.countryCode}`;
    const index = latinize(cityText).toLowerCase().indexOf(cityName); // Get the index of the matching letters

    if (index !== -1) {
      // If there is a match, make the matching letters bold
      const boldText = document.createElement('b');
      boldText.textContent = cityText.slice(index, cityName.length);
      listItem.appendChild(document.createTextNode(cityText.slice(0, index)));
      listItem.appendChild(boldText);
      listItem.appendChild(document.createTextNode(cityText.slice(index + cityName.length)));
    } else {
      // If there is no match, display the city name as is
      listItem.textContent = cityText;
    }

    dropdownList.appendChild(listItem);
  });
}

// Handle the click event on the results in the dropdown list
async function handleDropdownItemClick(event) {
  const selectedCity = event.target.textContent;
  inputField.value = '';
  dropdownList.innerHTML = '';
  appContainer.classList.remove('passive');
  await updateWeatherInfo(selectedCity);
}

export { handleInput, handleDropdownItemClick };
