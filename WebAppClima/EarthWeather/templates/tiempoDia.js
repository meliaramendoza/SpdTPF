// Función para traducir la descripción del clima al español
function translateDescription(description) {
    // Objeto con traducciones predefinidas
    const translations = {
        'clear sky': 'Cielo despejado',
        'few clouds': 'Pocas nubes',
        'scattered clouds': 'Nubes dispersas',
        'broken clouds': 'Nubes rotas',
        'moderate rain': 'Lluvias moderadas',
        'shower rain': 'Lluvia ligera',
        'rain': 'Lluvia',
        'thunderstorm': 'Tormenta',
        'snow': 'Nieve',
        'mist': 'Neblina',
        'heavy intensity rain': 'Lluvia de gran intensidad',
        'overcast clouds': 'Nubes cubiertas',
        'very heavy rain': 'Lluvias muy intensas',
        'thunderstorm with light rain': 'Tormenta con lluvia ligera',
        'haze': 'Bruma',
        'thunderstorm with rain': 'Tormenta con lluvia',
        'light rain': 'Lluvia ligera',
    };
    // Buscar la traducción correspondiente
    const translatedDescription = translations[description.toLowerCase()] || description;
    // Devolver la descripción traducida
    return translatedDescription;
}

// Esta función se ejecuta cuando el documento HTML ha sido completamente cargado
$(document).ready(function () {
    // Inicializar barra de navegación lateral
    $('.sidenav').sidenav();

    // Manejar el evento de clic en los enlaces de la barra de navegación
    $('#today-link').on('click', function () {
        window.location.href = 'tiempoHoy.html';
    });

    $('#hourly-link').on('click', function () {
        window.location.href = 'tiempoHora.html';
    });

    $('#weekly-link').on('click', function () {
        window.location.href = 'tiempoDia.html';
    });

    $('#logout-link').on('click', function () {
        window.location.href = 'logout.html';
    });

    // Manejar el evento de clic en el botón de búsqueda
    $('.btn-search').on('click', function () {
        searchWeatherByCity();
        $('#search-input').val('');
        $('#search-input').attr('placeholder', 'Ingrese el nombre de una Ciudad para obtener los reportes del clima');
    });

    // Función para manejar el clic en el botón "Ubicación Actual"
    $('.btn-location').on('click', function () {
        getCurrentLocation();
    });

    // Llamar a getCurrentLocation al iniciar la página
    getCurrentLocation();
});

// Esta función se ejecuta cuando el contenido del DOM ha sido completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Definición de variables para la API del clima
    const apiKey = '0954a26f9337f39ebaa7887f13820fce';
    const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';
    const city = '';

    // Obtener elementos del DOM necesarios para mostrar la información del clima
    const weatherContainer = document.getElementById('weekly-card');
    const cityNameElement = document.getElementById('city-name');

    // Establecer un tamaño de tarjeta estática al iniciar la página
    weatherContainer.style.height = '1000px'; 

    // Función asincrónica para obtener la previsión del clima
    const getWeatherForecast = async () => {
        try {
            const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            console.error('Error al obtener la previsión meteorológica', error);
        }
    };

    // Función para mostrar la información del clima en el DOM
    const displayWeather = (data) => {
        const forecastList = data.list;
        const weeklyForecast = forecastList.filter((item, index) => index % 8 === 0);
        const forecastHTML = weeklyForecast.map(day => `
            <div class="forecast-item">
                <h2>${new Date(day.dt * 1000).toLocaleDateString('es-ES', { weekday: 'long' })}</h2>
                <img src="http://openweathermap.org/img/w/${day.weather[0].icon}.png" alt=Weather Icon>
                <p>${translateDescription(day.weather[0].description)}</p>
                <p>Temperatura: ${day.main.temp} °C</p>
                <hr>
            </div>
        `).join('');
        weatherContainer.innerHTML = forecastHTML;

        if (cityNameElement) {
            cityNameElement.textContent = city;
        }
    };
    getWeatherForecast();
});

// Función para limpiar el placeholder cuando se hace clic en el campo de búsqueda
$('#search-input').on('focus', function () {
    $(this).attr('placeholder', '');
});

// Función para restaurar el placeholder cuando se sale del campo de búsqueda
$('#search-input').on('blur', function () {
    if ($(this).val().trim() === '') {
        $(this).attr('placeholder', 'Ingrese el nombre de una Ciudad para obtener los reportes del clima');
    }
});

// Obtener la ubicación actual del usuario
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        console.error('Geolocalización no es soportada por tu navegador.');
    }
}

// Manejar el éxito de la obtención de la ubicación
function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    getWeatherForecastByCoordinates(latitude, longitude);
}

// Manejar errores al obtener la ubicación
function error() {
    console.error('Error al obtener la ubicación actual.');
}

// Obtener la previsión del clima utilizando las coordenadas geográficas
function getWeatherForecastByCoordinates(latitude, longitude) {
    const apiKey = '0954a26f9337f39ebaa7887f13820fce';
    const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';

    const weatherContainer = document.getElementById('weekly-card');
    const cityNameElement = document.getElementById('city-name');

    const getWeatherForecast = async () => {
        try {
            const response = await fetch(`${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            console.error('Error al obtener la previsión meteorológica', error);
        }
    };

    const displayWeather = (data) => {
        const forecastList = data.list;
        const weeklyForecast = forecastList.filter((item, index) => index % 8 === 0);
        const forecastHTML = weeklyForecast.map(day => `
            <div class="forecast-item">
                <h2>${new Date(day.dt * 1000).toLocaleDateString('es-ES', { weekday: 'long' })}</h2>
                <img src="http://openweathermap.org/img/w/${day.weather[0].icon}.png" alt=Weather Icon>
                <p>${translateDescription(day.weather[0].description)}</p>
                <p>Temperatura: ${Math.round(parseFloat(day.main.temp))} °C</p>
                <hr>
            </div>
        `).join('');
        weatherContainer.innerHTML = forecastHTML;

        if (cityNameElement) {
            cityNameElement.textContent = data.city.name; // Usar el nombre de la ciudad desde la respuesta de la API
        }
    };

    getWeatherForecast();
}

// Función para buscar la previsión meteorológica por el nombre de la ciudad
function searchWeatherByCity() {
    const cityName = $('#search-input').val().trim();
    if (cityName !== '') {
        getWeatherForecastByCity(cityName);
    }
}

// Función para obtener la previsión del clima por el nombre de la ciudad
function getWeatherForecastByCity(cityName) {
    const apiKey = '0954a26f9337f39ebaa7887f13820fce';
    const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';

    const weatherContainer = document.getElementById('weekly-card');
    const cityNameElement = document.getElementById('city-name');

    const getWeatherForecast = async () => {
        try {
            const response = await fetch(`${apiUrl}?q=${cityName}&appid=${apiKey}&units=metric`);
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            console.error('Error al obtener la previsión meteorológica', error);
        }
    };

    const displayWeather = (data) => {
        const forecastList = data.list;
        const weeklyForecast = forecastList.filter((item, index) => index % 8 === 0);
        const forecastHTML = weeklyForecast.map(day => `
            <div class="forecast-item">
                <h2>${new Date(day.dt * 1000).toLocaleDateString('es-ES', { weekday: 'long' })}</h2>
                <img src="http://openweathermap.org/img/w/${day.weather[0].icon}.png" alt=Weather Icon>
                <p>${translateDescription(day.weather[0].description)}</p>
                <p>Temperatura: ${Math.round(day.main.temp)} °C</p>
                <hr>
            </div>
        `).join('');
        weatherContainer.innerHTML = forecastHTML;

        if (cityNameElement) {
            cityNameElement.textContent = data.city.name; // Usar el nombre de la ciudad desde la respuesta de la API
        }
    };

    getWeatherForecast();
}