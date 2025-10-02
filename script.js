function getweather(){
    const apiKey = 'Open_weather_API_key';
    const city = document.getElementById('city').value;

    if(!city){
        alert('Please enter a city!');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

    fetch(currentWeatherUrl).then(response => response.json()).then(data => {displayWeather(data);}).catch(error => {
        console.error('Error fetching current weather data: ', error);
        alert('Error fetching current weather data. Please try again');
    });

    fetch(forecastUrl).then(response => response.json()).then(data => {displayhourlyforecast(data);}).catch(error=> {
        console.error('Error fetching current forecast data: ', error);
        alert('Error fetching current forecast data. Please try again');
    });
    
}

function displayWeather(data){
    const TempDivInfo = document.getElementById('temp-div');
    const WeatherInfoDiv = document.getElementById('weather-info');
    const WeatherIcon = document.getElementById('weather-icon');
    const HourlyForecastDiv = document.getElementById('hourly-forecast');

    WeatherInfoDiv.innerHTML = '';
    WeatherIcon.innerHTML = '';
    HourlyForecastDiv.innerHTML = '';

    if(data.cod === '404'){
        WeatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    }else{
        const cityname = data.name;
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const IconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `<p>${temperature}°F</p>`;

        const weatherHTML = `<p>${cityname}</p><p>${description}</p>`;

        TempDivInfo.innerHTML = temperatureHTML;
        WeatherInfoDiv.innerHTML = weatherHTML;
        WeatherIcon.src = IconUrl;
        WeatherIcon.alt = description;
    
        showImage();
    }

}

function displayhourlyforecast(hourlyData) {
    const HourlyForecastDiv = document.getElementById('hourly-forecast');
    const next24Hours = hourlyData.list.slice(0,8);

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = item.main.temp;
        const iconCode = item.weather[0].icon;
        const IconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
        const hourlyItemHtml = `<div class = "hourly-item"><span>${hour}:00</span><img src="${IconUrl}" alt = "hourly Weather Icon"> <span>${temperature}°F</span></div>`;

        HourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage(){
    const WeatherIcon = document.getElementById('weather-icon');
    WeatherIcon.style.display = 'block';
}
