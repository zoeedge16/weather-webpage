var apiKey = '675793050fa3144fb1fed403f292b937'

var searchArea = document.querySelector('.search-container');
var temp = document.querySelector('#temp');
var wind = document.querySelector('#wind');
var humidity = document.querySelector('#humidity');
var cityDate = document.querySelector('#cityDate');
var currentDate = dayjs().format('MM/DD/YYYY');
var fiveDayEl = document.querySelector('#forecast');
var weatherContainer = document.querySelector('#weather-container');

function getGeo (city) {
    
    // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data){
        getWeather(data[0].lat, data[0].lon, city);
        getForecast(data[0].lat, data[0].lon, city);
    });
}

function getWeather(lat, lon, city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        temp.innerHTML = 'Temperature: ' + Math.floor(data.main.temp) + ' F';
        humidity.innerHTML = 'Humidity: ' + Math.floor(data.main.humidity) + '%';
        cityDate.innerHTML = city + ' ' + '(' + currentDate + ')';
        wind.innerHTML = 'wind: ' + Math.floor(data.wind.speed) + ' mph';
    })
}

function getForecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log('DATA', data);
        for (var i = 0; i < data.list.length; i++) {
            if (i % 8 === 2) {
                var containerEl = document.createElement('div');
                containerEl.setAttribute('id', 'five-day-container');
                fiveDayEl.appendChild(containerEl);
                var cardEl = document.createElement('div');
                cardEl.setAttribute('class', 'card');
                cardEl.setAttribute('style', 'margin: 10px 10px 10px 10px; width: 10rem;')
                containerEl.appendChild(cardEl);
                var cardBodyEl = document.createElement('div')
                cardBodyEl.setAttribute('class', 'card-body');
                cardEl.appendChild(cardBodyEl);
                var dataEl = document.createElement('h5');
                dataEl.innerHTML = dayjs((data.list[i]).dt_txt.substring(0, 10).format('MM/DD/YYYY'));
                dateEl.setAttribute('class', 'card-title text-dark');
                dateEl.setAttribute('style', 'text-align: center;');
                var iconUrl = 'https://openweathermap.org/img/w' + data.list[i].weather[0].icon + '.png';
                var iconEl = document.createElement('h6');
                iconEl.innerHTML = '<img src="https://openweathermap.org/img/w" '+ data.list[i].weather[0].icon +' ".png" alt= "weather icon">';
                iconEl.setAttribute('class', 'card-title text-dark');
                iconEl.setAttribute('style', 'text-align: center;');
                var fiveTempEl = document.createElement('p')
                fiveTempEl.innerHTML = 'Temp: ' + Math.floor((data.list[i].main.temp)) + 'F';
                fiveTempEl.setAttribute('class', 'card-title text-dark');
                fiveTempEl.setAttribute('style', 'text-align: center;');
                var fiveHumidityEl = document.createElement('p')
                fiveHumidityEl.innerHTML = 'Humidity: ' + Math.floor((data.list[i].main.temp)) + '%';
                fiveHumidityEl.setAttribute('class', 'card-title text-dark');
                fiveHumidityEl.setAttribute('style', 'text-align: center;');
                var fiveWindEl = document.createElement('p')
                fiveWindEl.innerHTML = 'Wind: ' + Math.floor((data.list[i].main.temp)) + 'MPH';
                fiveWindEl.setAttribute('class', 'card-title text-dark');
                fiveWindEl.setAttribute('style', 'text-align: center;');
                cardEl.appendChild(dateEl);
                cardEl.appendChild(iconEl);
                cardEl.appendChild(fiveTempEl);
                cardEl.appendChild(fiveHumidityEl);
                cardEl.appendChild(fiveWindEl);
            }
        }
    })
}

getGeo();
getWeather();
getForecast();