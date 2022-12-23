let d = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function getMinutes() {
  let minute = d.getMinutes();
  if (minute < 10) {
    minute = 0 + minute.toString();
  }
  return minute;
}

document.getElementById("time").innerHTML = `${days[d.getDay()]}
 ${d.getHours()}:${getMinutes()}`;
