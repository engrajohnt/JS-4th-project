

document.getElementById('weatherForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const location = document.getElementById('location').value;

    getWeather(location)
        .then(weatherData => {
            displayWeatherInfo(weatherData);
            return getCountryInfo(weatherData.sys.country);
        })
        .then(countryData => displayCountryInfo(countryData))
        .catch(error => console.error(error));
});

function getWeather(location) {
    const apiKey = '1a07963bddc9ad1f07368819f619dd46'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

    return new Promise((resolve, reject) => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

function getCountryInfo(countryCode) {
    const apiUrl = `https://restcountries.com/v2/alpha/${countryCode}`;

    return new Promise((resolve, reject) => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

function displayWeatherInfo(weatherData) {
    const weatherInfoElement = document.getElementById('weatherInfo');
    weatherInfoElement.innerHTML = `
        <h4>Weather Information</h4>
        <p>Temperature: ${weatherData.main.temp} &#8451;</p>
        <p>Weather: ${weatherData.weather[0].description}</p>
    `;
    weatherInfoElement.style.display = 'block';
}

function displayCountryInfo(countryData) {
    const countryInfoElement = document.getElementById('countryInfo');
    countryInfoElement.innerHTML = `
        <h4>Country Information</h4>
        <p>Country: ${countryData.name}</p>
        <p>Capital: ${countryData.capital}</p>
        <p>Population: ${countryData.population}</p>
    `;
    countryInfoElement.style.display = 'block';
}
