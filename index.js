const apikey = "772f72b780c60196700b2032c6d429df";

const weatherDataEl = document.getElementById("weather-data");
const cityInputEl = document.getElementById("city-input");
const formEl = document.querySelector("form");
formEl.addEventListener("submit", function (event) {
  event.preventDefault();
  const cityValue = cityInputEl.value;
  getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}`,
      `Humidity:${data.main.humidity}% `,
      `Wind:${data.wind.speed}m/s`,
    ];
    weatherDataEl.querySelector(
      ".icon"
    ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon"/>`;
    weatherDataEl.querySelector(".temperature").innerHTML = `${temperature}°C`;
    weatherDataEl.querySelector(".description").innerHTML = description;
    weatherDataEl.querySelector(".details").innerHTML = details
      .map((details) => `<div>${details}</div>`)
      .join("");
  } catch (error) {
    weatherDataEl.querySelector(
      ".icon"
    ).innerHTML = `<img src="https://www.freeiconspng.com/thumbs/error-icon/error-icon-32.png" alt="weather icon"/>`;
    weatherDataEl.querySelector(".temperature").innerHTML = "";
    weatherDataEl.querySelector(".description").innerHTML =
      "An error occured. Please try again later.";
    weatherDataEl.querySelector(".details").innerHTML = "";
  }
}
