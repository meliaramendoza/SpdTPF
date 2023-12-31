from django.shortcuts import render
from django.http import JsonResponse
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

# def tiempoHoy_view(request):
#     # Lógica de la vista (si es necesario)
#     return render(request, 'EarthWeather/tiempoHoy.html')

def login(request):
    return render(request, 'login.html')

def tiempoHoy(request):
    return render(request, "tiempoHoy.html")

def tiempoDia(request):
    return render(request, "tiempoDia.html")

def tiempoHora(request):
    return render(request, "tiempoHora.html")
