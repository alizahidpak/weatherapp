import latinize from 'latinize';
import { cityApiUrl, cityApiOptions, weatherApiKey, weatherApiUrl } from './api';
import { updateWeatherInfo } from './weather-info';

const inputField = document.getElementById('cityInput');
const dropdownList = document.getElementById('cityDropdown');
const appContainer = document.getElementById('app');
const spinner = document.querySelector('.spinner');

let delayTimer = null;

async function handleInput(event) {
  clearTimeout(delayTimer);

  const cityName = event.target.value;
  if (cityName.length > 0) {
    spinner.classList.remove('hidden');
    delayTimer = setTimeout(async () => {
      const cityData = await fetchCityData(cityName);
      await updateDropdown(cityData);
      spinner.classList.add('hidden');
    }, 1500);
  } else {
    dropdownList.innerHTML = '';
  }
}

async function fetchCityData(cityName) {
  const response = await fetch(
    `${cityApiUrl}?namePrefix=${cityName}&limit=10&sort=-population`,
    cityApiOptions
  );
  const result = await response.json();
  return result.data || [];
}

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

async function updateDropdown(cityData) {
  const resultCityData = await filterApi(cityData);

  dropdownList.innerHTML = '';

  if (resultCityData.length === 0) {
    dropdownList.innerHTML = '<li>No results found.</li>';
    return;
  }

  const cityName = latinize(inputField.value.toLowerCase());
  resultCityData.forEach((city) => {
    const listItem = document.createElement('li');
    const cityText = `${city.city}, ${city.countryCode}`;
    const regex = new RegExp(`${cityName}`, 'gi');
    const latinizedCityText = latinize(cityText.toLowerCase());
    const matches = latinizedCityText.match(regex);

    if (matches) {
      let currentIndex = 0;
      matches.forEach((match) => {
        const latinizedMatch = latinize(match);
        const matchIndex = latinizedCityText.indexOf(latinizedMatch, currentIndex);
        const beforeMatch = cityText.slice(currentIndex, matchIndex);
        const boldText = document.createElement('b');
        boldText.textContent = cityText.slice(matchIndex, matchIndex + latinizedMatch.length);
        listItem.appendChild(document.createTextNode(beforeMatch));
        listItem.appendChild(boldText);
        currentIndex = matchIndex + latinizedMatch.length;
      });
      const afterMatch = cityText.slice(currentIndex);
      listItem.appendChild(document.createTextNode(afterMatch));
    } else {
      listItem.textContent = cityText;
    }

    dropdownList.appendChild(listItem);
  });
}

async function handleDropdownItemClick(event) {
  const selectedCity = event.target.textContent;
  inputField.value = '';
  dropdownList.innerHTML = '';
  appContainer.classList.remove('passive');
  await updateWeatherInfo(selectedCity);
}

export { handleInput, handleDropdownItemClick };
