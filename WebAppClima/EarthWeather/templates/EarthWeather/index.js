document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-button");
    const cityInput = document.getElementById("city-input");
    const countryInput = document.getElementById("country-input");
    const weatherResult = document.getElementById("weather-result");
    const currentLocationWeather = document.getElementById("current-location-weather");
    let hasSearched = false;

    searchButton.addEventListener("click", () => {
        const cityName = cityInput.value; // Obtenemos el nombre de la ciudad
        const countryName = countryInput.value; // Obtenemos el nombre del país
        const query = countryName ? `${cityName},${countryName}` : cityName; // Concatenamos ciudad y país que se proporciona
        obtenerTemperatura(query)
            .then((data) => {
                mostrarResultado(weatherResult, cityName, data);
                hasSearched = true;
                currentLocationWeather.innerHTML = "";
            })
            .catch(() => {
                mostrarError(weatherResult);
            });
    });

    // Obtener la temperatura de la ubicación actual al cargar la página
    obtenerUbicacionActual()
        .then((position) => {
            const coordinates = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            obtenerClimaPorCoordenadas(coordinates.latitude, coordinates.longitude)
                .then((data) => {
                    const cityName = data.name;
                    if (!hasSearched) {
                        mostrarResultado(currentLocationWeather, cityName, data);
                    }
                })
                .catch(() => {
                    mostrarError(currentLocationWeather);
                });
        })
        .catch(() => {
            mostrarError(currentLocationWeather);
        });

    function obtenerTemperatura(query) {
        const apiKey = "80262e58d8e929165c157cb25026229e";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`;
        return fetch(apiUrl).then((response) => response.json());
    }

    function obtenerUbicacionActual() {
        return new Promise((resolve, reject) => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve(position);
                    },
                    (error) => {
                        reject(error);
                    }
                );
            } else {
                reject("La geolocalización no está disponible en tu navegador.");
            }
        });
    }

    function obtenerClimaPorCoordenadas(latitude, longitude) {
        const apiKey = "80262e58d8e929165c157cb25026229e";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
        return fetch(apiUrl).then((response) => response.json());
    }

    function mostrarResultado(element, cityName, data) {
        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;
        const iconCode = data.weather[0].icon;

        const temperatureElement = document.createElement("p");
        temperatureElement.textContent = `Temperatura actual en ${cityName}: ${temperature}°C, ${weatherDescription}`;

        const iconElement = document.createElement("img");
        iconElement.src = `https://openweathermap.org/img/wn/${iconCode}.png`;
        iconElement.alt = "Icono del clima";

        temperatureElement.classList.add("temperature-animation");
        element.innerHTML = "";
        element.appendChild(iconElement);
        element.appendChild(temperatureElement);
    }

    function mostrarError(element) {
        element.innerHTML = "No se pudo obtener la temperatura actual.";
    }
});