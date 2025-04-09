const apikey = "b9052bffb672afb48f55e48cb100663c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weathericn = document.querySelector(".weather-icon");

async function checkweather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apikey}`);
    const data = await response.json();

    if (response.status === 404 || data.cod === "404") {
        alert("City not found!");
        return;
    }

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/hr";

    if (data.weather[0].main === "Clouds") {
        weathericn.src = "images/clouds.png";
    } else if (data.weather[0].main === "Clear") {
        weathericn.src = "images/clear.png";  // Fix typo: "clears.png" -> "clear.png"
    } else if (data.weather[0].main === "Rain") {
        weathericn.src = "images/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
        weathericn.src = "images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
        weathericn.src = "images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
}

searchbtn.addEventListener("click", () => {
    checkweather(searchbox.value);
});
