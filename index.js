
/*This function will take in the location as a string and return weather data*/

function queryOpenWeather(cityInput){

  let weatherData;

  let apiKey = '9ccfde44cd99c120bad6a7b986a92fb2';
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`)
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      weatherKelvin = data.main.temp;
      weatherCelsius = weatherKelvin - 273.15;
      console.log(weatherCelsius);
    }).catch(console.log);
}

/*async function queryOpenWeather(cityInput){
  let weatherData;
}*/

let city = prompt('Enter Location');
queryOpenWeather(city);
