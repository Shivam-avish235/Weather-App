const weatherform = document.querySelector(".weatherform");
const cityinput = document.querySelector(".cityinput");
const card = document.querySelector(".card");
const apiKey = "182920644d088e2a0f010135636e2fbb";

weatherform.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityinput.value.trim();

  if (city) {
    try {
      const data = await getWeatherData(city);
      displayweatherInfo(data);
    } catch (error) {
      displayError(error.message);
    }
  } else {
    displayError("Please enter a city");
  }
});

async function getWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    return {
      city: data.name,
      temp: Math.round(data.main.temp),
      humidity: data.main.humidity,
      description: data.weather[0].description,
      weatherId: data.weather[0].id,
    };
  } catch (error) {
    throw new Error("Failed to fetch weather data");
  }
}



function displayweatherInfo(info) {
  card.innerHTML = "";

  const cityDisplay = document.createElement("h1");
  cityDisplay.className = "cityDisplay";
  cityDisplay.textContent = info.city;

  const tempDisplay = document.createElement("p");
  tempDisplay.className = "temperature";
  tempDisplay.textContent = `${info.temp}°F`;

  const humidityDisplay = document.createElement("p");
  humidityDisplay.className = "humidityDisplay";
  humidityDisplay.textContent = `Humidity: ${info.humidity}%`;

  const descDisplay = document.createElement("p");
  descDisplay.className = "desc";
  descDisplay.textContent = info.description;


  const weatherImage = document.createElement("img");
  weatherImage.className = "weatherImage";
  weatherImage.src = getWeatherEmoji(info.weatherId);
  weatherImage.alt = "Weather condition icon";

  
  card.append(
    cityDisplay,
    tempDisplay,
    humidityDisplay,
    descDisplay,
    weatherImage
  );
  card.style.display = "block";
}


function getWeatherEmoji(weatherId) {
  if (weatherId >= 200 && weatherId < 300) return "images/rain.png";
  if (weatherId >= 300 && weatherId < 400) return "images/rain.png";
  if (weatherId >= 500 && weatherId < 600) return "images/rain.png"; 
  if (weatherId >= 600 && weatherId < 700) return "images/rain.png";
  if (weatherId >= 700 && weatherId < 800) return "images/cloudy.png";
  if (weatherId === 800) return "images/clear.png";
  if (weatherId > 800 && weatherId < 810) return "images/cloudy.png";
  return "images/clear.png";
}

function displayError(message) {
  card.innerHTML = "";
  const errorDisplay = document.createElement("p");
  errorDisplay.className = "errorDisplay";
  errorDisplay.textContent = message;
  card.appendChild(errorDisplay);
  card.style.display = "block";
}
