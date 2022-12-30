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
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayIndex = date.getDay();

  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function getDay(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let dayIndex = date.getDay();

  let day = days[dayIndex];
  return day;
}

function call(event) {
  event.preventDefault();

  city = document.getElementById("city-input").value;
  search(city);
}

function search(city) {
  let url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

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
    .setAttribute("src", response.data.daily[0].condition.icon_url);

  document
    .getElementById("icon")
    .setAttribute("alt", response.data.daily[0].condition.description);

  let time = new Date(response.data.daily[0].time * 1000);
  document.getElementById("date").innerHTML = formatDate(time);
  document.getElementById("city").innerHTML = response.data.city;

  celsiusTemperature = Math.round(response.data.daily[0].temperature.day);
  document.getElementById("temperature").innerHTML = celsiusTemperature;
  document.getElementById("humidity").innerHTML =
    response.data.daily[0].temperature.humidity;
  document.getElementById("wind").innerHTML = response.data.daily[0].wind.speed;
  document.getElementById("description").innerHTML =
    response.data.daily[0].condition.description;

  displayForcast(response.data);
}

let form = document.getElementById("search-form");
form.addEventListener("submit", call);

search("Lisbon");

function displayForcast(data) {
  let forcastHtml = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat"];
  data.daily.forEach((day, index) => {
    if (index < 6) {
      let time = new Date(day.time * 1000);

      let template = `<div class="col-2">
                <div class="weather-forecast-date">${getDay(time)}</div>
                <img
                  width="60"
                  src="${day.condition.icon_url}"
                  id="img-forcast-icon"
                />
                <span class="weather-forcast-tempreture-max">${Math.round(
                  day.temperature.maximum
                )}°</span>
                <span class="weather-forecast-temperature-min">${Math.round(
                  day.temperature.minimum
                )}°</span>
              </div>
            `;

      forcastHtml = forcastHtml + template;
    }
  });
  forcastHtml = forcastHtml + `</div>`;
  document.getElementById("forecast").innerHTML = forcastHtml;
}
