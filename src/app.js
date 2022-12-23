let apiKey = "1ee4264117b73d2263eecd562f31ef5c";

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
document.getElementById("time").innerHTML = formatDate(new Date());

let form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();


https: axios
  .get(
    `https://api.openweathermap.org/data/2.5/weather?q=${
      document.getElementById("searchcity").value
    }&appid=${apiKey}&units=metric`
  )
  .then(function (response) {
    debugger;
    let temp = Math.round(response.data.main.temp);
    let description = response.data.weather[0].description;
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#description").innerHTML = `${description}`;
    document.querySelector("#temperature").innerHTML = `${temp}`;
    document.querySelector(
      "#humidity"
    ).innerHTML = `${response.data.main.humidity}%`;
    document.querySelector("#wind").innerHTML = `${Math.round(
      response.data.wind.speed
    )}km/h`;
  });
});
