$(document).ready(function () {
    // Inicializar barra de navegación lateral
    $('.sidenav').sidenav();

    // Manejar eventos de clic en enlaces de la barra de navegación
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
        window.location.href = 'login.html';
    });

    // Obtener la ubicación del usuario al cargar la página
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            getLocationWeather(position.coords.latitude, position.coords.longitude);
        });
    }

    // Manejar eventos de búsqueda
    $('.btn-search').on('click', function () {
        var cityName = $('#search-input').val();
        if (cityName.trim() !== '') {
            // Obtener información del clima por nombre de la ciudad
            $.getJSON('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=0954a26f9337f39ebaa7887f13820fce', function (weatherData) {
                updateWeatherInfo(weatherData);
                // Limpiar campo de búsqueda y restaurar placeholder
                $('#search-input').val('');
                $('#search-input').attr('placeholder', 'Ingrese el nombre de una Ciudad para obtener los reportes del clima');
            });
        }
    });

    // Manejar eventos de clic en botón de ubicación actual
    $('.btn-location').on('click', function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                getLocationWeather(position.coords.latitude, position.coords.longitude);
            });
        }
    });

    // Manejar eventos de foco y desenfoque en el campo de búsqueda
    $('#search-input').on('focus', function () {
        $(this).attr('placeholder', '');
    });

    $('#search-input').on('blur', function () {
        if ($(this).val().trim() === '') {
            $(this).attr('placeholder', 'Ingrese el nombre de una Ciudad para obtener los reportes del clima');
        }
    });

    // Función para obtener información del clima por ubicación geográfica
    function getLocationWeather(latitude, longitude) {
        $.getJSON('https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=0954a26f9337f39ebaa7887f13820fce', function (weatherData) {
            updateWeatherInfo(weatherData);
        });
    }

    // Función para actualizar la información del clima en la interfaz de usuario
    function updateWeatherInfo(weatherData) {
        var cityName = weatherData.name;
        var temperature = weatherData.main.temp;
        var temperatureCelsius = Math.round(temperature - 273.15); // Convertir de Kelvin a Celsius
        var weatherIcon = weatherData.weather[0].icon; // Obtener el código del icono de OpenWeatherMap
        var weatherDescription = weatherData.weather[0].description;
        var humidity = weatherData.main.humidity;
        var windSpeed = weatherData.wind.speed;
        var cloudiness = weatherData.clouds.all;
        var pressure = weatherData.main.pressure;
        
        // Mostrar la temperatura en el contenedor
        var container = document.getElementById('weather-container');
        var temperatureInfo = document.getElementById('temperature-info');
        var temperatureIcon = document.getElementById('temperature-icon');
        var weatherDescriptionElement = document.getElementById('weather-description-text');
        var humidityElement = document.getElementById('humidity-text');
        var windSpeedElement = document.getElementById('wind-speed-text');
        var cloudinessElement = document.getElementById('cloudiness-text');
        var pressureElement = document.getElementById('pressure-text');

        temperatureInfo.innerHTML = '<p>La temperatura actual en ' + cityName + ' es: ' + temperatureCelsius + '°C</p>';
        temperatureIcon.innerHTML = '<img src="http://openweathermap.org/img/w/' + weatherIcon + '.png" alt="Weather Icon">';

        // Traducir la descripción del clima al español
        const translatedDescription = translateDescription(weatherDescription);
        weatherDescriptionElement.textContent = 'Descripción del clima: ' + translatedDescription;

        humidityElement.textContent = 'Humedad: ' + humidity + '%';
        windSpeedElement.textContent = 'Velocidad del viento: ' + windSpeed + ' m/s';
        cloudinessElement.textContent = 'Nubosidad: ' + cloudiness + '%';
        pressureElement.textContent = 'Presión atmosférica: ' + pressure + ' hPa';
    }
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
            'heavy intensity rain': 'LLuvia de gran intensidad',
            'overcast clouds': 'Nubes cubiertas',
            'very heavy rain': 'Lluvias muy intensas',
            'thunderstorm with light rain': 'Tormenta con lluvia ligera',
            'haze': 'Bruma',
            'thunderstorm with rain': 'Tormenta con lluvia',
            'smoke':'Humo',
        };
        // Buscar la traducción correspondiente
        const translatedDescription = translations[description.toLowerCase()] || description;
        // Devolver la descripción traducida
        return translatedDescription;
    }
});