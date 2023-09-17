import requests

city = input("Ciudad: ")

url = "https://api.openweathermap.org/data/2.5/weather?q={}&appid=80262e58d8e929165c157cb25026229e".format(city)

# Se envia al API la url y la ciudad para que lo analice
res = requests.get(url)

data = res.json()

temp_kelvin = data["main"]["temp"]
temp_celsius = temp_kelvin - 273.15  # Conversión de Kelvin a Celsius
vel_viento = data["wind"]["speed"]

latitud = data["coord"]["lat"]
longitud = data["coord"]["lon"]

descripcion = data["weather"][0]["description"]


print("Temperatura: {:.2f} °C".format(temp_celsius))  # Mostrar temperatura en Celsius con 2 decimales
print("Velocidad del viento: {} m/s".format(vel_viento))
print("Latitud: {}".format(latitud))
print("Longitud: {}".format(longitud))
print("Descripción: {}".format(descripcion))

