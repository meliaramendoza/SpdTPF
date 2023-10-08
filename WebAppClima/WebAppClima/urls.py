from django.http import JsonResponse
from django.urls import path
from EarthWeather import views
from EarthWeather.views import index

import geocoder

def get_user_location(request):
    if request.method == 'GET':
        # Obtiene la dirección IP del cliente (puede ser una IP pública o privada)
        client_ip = request.META.get('REMOTE_ADDR')

        # Utiliza geocoder para obtener la ubicación geográfica
        g = geocoder.ip(client_ip)

        if g.latlng:
            # Si se obtiene la ubicación, devuelve las coordenadas (latitud y longitud)
            return JsonResponse({'latitude': g.latlng[0], 'longitude': g.latlng[1]})
        else:
            return JsonResponse({'error': 'No se pudo obtener la ubicación del usuario.'})
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)

urlpatterns = [
    # path('', views.inicio, name='b'),
    path('index/', index),
]
