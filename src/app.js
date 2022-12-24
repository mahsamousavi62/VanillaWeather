let apiKey = "831145553ta05682f82of176f82b2b14";

let celsiusTemperature = null;

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function call(event) {
  event.preventDefault();

  city = document.getElementById("city-input").value;
  search(city);
}

function search(city) {
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(url).then(ShowTempreture);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function ShowTempreture(response) {
  document
    .getElementById("icon")
    .setAttribute("src", response.data.condition.icon_url);

  document
    .getElementById("icon")
    .setAttribute("alt", response.data.condition.description
    );

  let time = new Date(response.data.time * 1000);
  document.getElementById("date").innerHTML = formatDate(time);
  document.getElementById("city").innerHTML = response.data.city;

  celsiusTemperature = Math.round(response.data.temperature.current);
  document.getElementById("temperature").innerHTML = celsiusTemperature;
  document.getElementById("humidity").innerHTML =
    response.data.temperature.humidity;
  document.getElementById("wind").innerHTML = response.data.wind.speed;

  document.getElementById("description").innerHTML =
    response.data.condition.description;
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
let form = document.getElementById("search-form");
form.addEventListener("submit", call);

search("Lisbon");
