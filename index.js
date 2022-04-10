
let weatherPromise;
let dataElement = document.querySelector('#temp-data');

async function getWeatherData(locationInput){

  let apiKey = '9ccfde44cd99c120bad6a7b986a92fb2';

  let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${locationInput}&appid=${apiKey}`);

  if(!response.ok){
    throw 'Weather Data Not Found';
  }

  let data = await response.json();

  let weatherKelvin = data.main.temp;
  let weatherCelsius = Math.round(weatherKelvin - 273.15);
  let weatherFahrenheit = Math.round(weatherKelvin * (9/5) - 459.67);

  return {weatherCelsius, weatherFahrenheit};
}

let formElement = document.querySelector('#location-form');
formElement.addEventListener('submit', (e) => {
  //prevent the default behavior of refreshing the page
  e.preventDefault();

  let locationInputElement = document.querySelector('#location-input');

  weatherPromise = getWeatherData(locationInputElement.value);

  weatherPromise.then((data) => {
    dataElement.textContent = data.weatherCelsius + ' C°';
  }).catch((err) => {
    dataElement.textContent = '';

    let errorMessage = document.querySelector('#error-message');
    errorMessage.textContent = err;
  });
});

let UnitToggleButton = document.querySelector('#unit-toggle');
UnitToggleButton.addEventListener('click', () => {

  weatherPromise.then((data) => {
    if(dataElement.value === 'c'){
      dataElement.value = 'f';
      dataElement.textContent = data.weatherFahrenheit + ' F°';
    } else {
      dataElement.value = 'c';
      dataElement.textContent = data.weatherCelsius + ' C°';
    }
  }).catch((err) => {
    
  });
});
