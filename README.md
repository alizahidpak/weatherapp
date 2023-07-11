<h1 align="center">Welcome to Weather App 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
</p>

> Displays current weather information (temperature, humidity, wind speed, weather condition) and local time of the selected city using OpenWeather API and GeoDB Cities API. When searching for city names, it automatically completes and generates suggestions.
>
> Built with vanilla JavaScript.

### ✨ [Demo](https://alipweatherapp.netlify.app/)

## Install

```sh
yarn
```

## Usage

```sh
yarn run dev
```

## API

#### [OpenWeather](https://www.openweathermap.org/)

> &#8618; You need to get an API for current weather data. Free plan is just fine for this project.

#### [GeoDB Cities](https://rapidapi.com/wirefreethought/api/geodb-cities/)

> &#8618; I've implemented autocomplete feature for city names provided by GeoDB. You don't need to pay for this, neither.

##### In api.js file:

| Name                                     | Change This                            | To This                              |
| :--------------------------------------- | :------------------------------------- | :----------------------------------- |
| `cityApiOptions.headers[X-RapidAPI-Key]` | `import.meta.env.VITE_CITY_API_KEY`    | Your GeoDB Cities API **(Required)** |
| `weatherApiKey`                          | `import.meta.env.VITE_WEATHER_API_KEY` | Your OpenWeather API **(Required)**  |

##### or

> Set **VITE_CITY_API_KEY** and **VITE_WEATHER_API_KEY** in your environmental variables to the keys you get.

## Author

👤 **Ali Zahid Pak**

- Github: [@alizahidpak](https://github.com/alizahidpak)
