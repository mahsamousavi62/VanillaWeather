let apiKey = "831145553ta05682f82of176f82b2b14";

let celciosTempreture = 0;

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
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(url).then(ShowTempreture);
}

function ShowTempreture(response) {
  //   console.log(response.data);

  document
    .getElementById("icon")
    .setAttribute("src", response.data.condition.icon_url);
  let time = new Date(response.data.time * 1000);
  document.getElementById("date").innerHTML = formatDate(time);
  document.getElementById("city").innerHTML = response.data.city;

  celciosTempreture = Math.round(response.data.temperature.current);
  document.getElementById("temperature").innerHTML = celciosTempreture;
  document.getElementById("humidity").innerHTML =
    response.data.temperature.humidity;
  document.getElementById("wind").innerHTML = response.data.wind.speed;
  document.getElementById("description").innerHTML =
    response.data.condition.description;
}

let form = document.getElementById("search-form");
form.addEventListener("submit", call);
