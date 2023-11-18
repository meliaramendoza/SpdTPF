$(document).ready(function(){
    $('.sidenav').sidenav();
    // Manejar el evento de clic en los enlaces de la barra de navegación
    $('#today-link').on('click', function() {
        window.location.href = 'tiempoHoy.html'; 
    });
    $('#hourly-link').on('click', function() {
        window.location.href = 'tiempoHora.html'; 
    });
    $('#weekly-link').on('click', function() {
        window.location.href = 'tiempoDia.html'; 
    });
    $('#logout-link').on('click', function() {
        window.location.href = 'logout.html'; 
    });
    // Obtener la ubicación del usuario al cargar la página
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            getLocationWeather(position.coords.latitude, position.coords.longitude);
        });
    }
    // Manejar el evento de clic en el botón de búsqueda
    $('.btn-search').on('click', function() {
        var cityName = $('#search-input').val();
        if (cityName.trim() !== '') {
            // Obtener la información del clima basada en el nombre de la ciudad
            $.getJSON('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=0954a26f9337f39ebaa7887f13820fce', function(weatherData){
                updateWeatherInfo(weatherData);
                // Limpiar el campo de búsqueda y restaurar el placeholder
                $('#search-input').val('');
                $('#search-input').attr('placeholder', 'Ingrese el nombre de una Ciudad para obtener los reportes del clima');
            });
        }
    });
    // Manejar el evento de clic en el botón de ubicación actual
    $('.btn-location').on('click', function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                getLocationWeather(position.coords.latitude, position.coords.longitude);
            });
        }
    });
    // Función para limpiar el placeholder cuando se hace clic en el campo de búsqueda
    $('#search-input').on('focus', function() {
        $(this).attr('placeholder', '');
    });
    // Función para restaurar el placeholder cuando se sale del campo de búsqueda
    $('#search-input').on('blur', function() {
        if ($(this).val().trim() === '') {
            $(this).attr('placeholder', 'Ingrese el nombre de una Ciudad para obtener los reportes del clima');
        }
    });
    // Función para obtener la información del clima basada en la ubicación geográfica proporcionada
    function getLocationWeather(latitude, longitude) {
        // Obtener la información del clima basada en la ubicación
        $.getJSON('https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=0954a26f9337f39ebaa7887f13820fce', function(weatherData){
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
        };
        // Buscar la traducción correspondiente
        const translatedDescription = translations[description.toLowerCase()] || description;
        // Devolver la descripción traducida
        return translatedDescription;
    }
});