
let weatherPromise;
let dataElement = document.querySelector('#temp-data');
let descriptionGif = document.querySelector('#description-gif');
let message = document.querySelector('#message');

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

  let weatherDescription = data.weather[0].description;

  return {weatherCelsius, weatherFahrenheit, weatherDescription};
}

async function getWeatherGif(searchQuery){
  let apiKey = 'JAc48hiyLDmFcTq62zehQURZ3Q138xAA';
  let response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${apiKey}&s=${searchQuery}`);

  let json = await response.json();
  return json.data.images.original.url;
}

let formElement = document.querySelector('#location-form');
formElement.addEventListener('submit', (e) => {
  //prevent the default behavior of refreshing the page
  e.preventDefault();

  descriptionGif.src = 'loading-gif.webp';

  let locationInputElement = document.querySelector('#location-input');

  weatherPromise = getWeatherData(locationInputElement.value);

  weatherPromise.then((data) => {
    dataElement.textContent = data.weatherCelsius + ' C°';
    message.textContent = 'Weather Description: ' + data.weatherDescription;
  }).catch((err) => {
    dataElement.textContent = '';
    message.textContent = err;
  });

  getWeatherGif(locationInputElement.value).then((data) => {
    descriptionGif.src = data;
  })
});

let UnitToggleButton = document.querySelector('#unit-toggle');
UnitToggleButton.addEventListener('click', () => {

  if(!weatherPromise){
    return;
  }

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
