function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tues", "Wen", "Thu", "Fri", "Sat", "Sun"];

  return days[day];
}

// format date displayed on the overview component
function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = new Date(timestamp * 1000);
  return days[day.getDay()];
}

function getForecast(coordinates) {
  let apiKey = `ea51f60fe988fca97b66493tbo25f95d`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let data = response.data;
  let temperatureElement = document.querySelector("#temperatureValue");
  let cityElement = document.querySelector("#cityName");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidityValue");
  let windSpeedElement = document.querySelector("#windSpeedValue");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = data.main.temp;

  temperatureElement.innerHTML = Math.round(data.main.temp);
  cityElement.innerHTML = `${data.name}, ${data.sys.country}`;
  descriptionElement.innerHTML = data.weather[0].description;
  humidityElement.innerHTML = data.main.humidity;
  windSpeedElement.innerHTML = Math.round(data.wind.speed);
  dateElement.innerHTML = formatDate(data.dt);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", data.weather[0].description);

  getForecast(data.coord);
}

function search(city) {
  let apiKey = "ea51f60fe988fca97b66493tbo25f95d";

  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

search("Cebu");

let form = document.querySelector("#search-form");
addEventListener("submit", handleSubmit);
