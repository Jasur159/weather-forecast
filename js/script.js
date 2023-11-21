"use strict";

const apikey = "cb657dc2e061de16fcf61b36409b102c";
const weatherDataEl = document.getElementById("weather_data");
const cityInput = document.getElementById("city_input");
const formEl = document.getElementById("form");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInput.value;
  getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
  try {
    const response =
      await fetch(`https://api.openweathermap.org/data/2.5/weather?
q=${cityValue}&appid=${apikey}&units=metric`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details = [
      `Humidity: ${data.main.humidity}%`,
      `Wind Speed : ${data.wind.speed} m/s`,
    ];
    weatherDataEl.querySelector(
      ".icon"
    ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon">`;
    weatherDataEl.querySelector(
      ".temperature"
    ).textContent = `${temperature}°C`;
    weatherDataEl.querySelector(".description").textContent = description;
    weatherDataEl.querySelector(".details").innerHTML = details
      .map((details) => `<div>${details}</div>`)
      .join("");
  } catch (error) {}
}
