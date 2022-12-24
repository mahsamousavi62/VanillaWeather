let apiKey = "1ee4264117b73d2263eecd562f31ef5c";

// function formatDate(date) {
//   let hours = date.getHours();
//   if (hours < 10) {
//     hours = `0${hours}`;
//   }
//   let minutes = date.getMinutes();
//   if (minutes < 10) {
//     minutes = `0${minutes}`;
//   }

//   let dayIndex = date.getDay();
//   let days = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];
//   let day = days[dayIndex];

//   return `${day} ${hours}:${minutes}`;
// }
//document.getElementById("time").innerHTML = formatDate(new Date());
function fetchForecast() {
  var endpoint = `https://api.openweathermap.org/data/2.5/onecall?lat=38.7267&lon=-9.1403&exclude=current,hourly,minutely,alerts&units=metric&appid=${apiKey}`;
  var forecastEl = document.getElementsByClassName("forecast");

  axios
    .get(endpoint)
    .then(function (response) {
      if (200 !== response.status) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }

      forecastEl[0].classList.add("loaded");

      var fday = "";
      response.data.daily.forEach((value, index) => {
        if (index > 0) {
          var dayname = new Date(value.dt * 1000).toLocaleDateString("en", {
            weekday: "long",
          });
          var icon = value.weather[0].icon;
          var temp = value.temp.day.toFixed(0);
          fday = `<div class="forecast-day">
						<p>${dayname}</p>
						<p><span class="ico-${icon}" title="${icon}"></span></p>
						<div class="forecast-day--temp">${temp}<sup>°C</sup></div>
					</div>`;
          forecastEl[0].insertAdjacentHTML("beforeend", fday);
        }
      });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}
let form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  fetchForecast();
  //   https: axios
  //     .get(
  //       `https://api.openweathermap.org/data/2.5/weather?q=${
  //         document.getElementById("searchcity").value
  //       }&appid=${apiKey}&units=metric&exclue=currnt,daily`
  //     )
  //     .then(function (response) {
  //       debugger;
  //       response.data.dt * 1000;
  //       let temp = Math.round(response.data.main.temp);
  //       let description = response.data.weather[0].description;
  //       document.querySelector("#city").innerHTML = response.data.name;
  //       document.querySelector("#description").innerHTML = `${description}`;
  //       document.querySelector("#temperature").innerHTML = `${temp}`;
  //       document.querySelector(
  //         "#humidity"
  //       ).innerHTML = `${response.data.main.humidity}%`;
  //       document.querySelector("#wind").innerHTML = `${Math.round(
  //         response.data.wind.speed
  //       )}km/h`;
  //     });
});
