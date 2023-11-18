// Función que se ejecuta cuando el documento HTML ha sido completamente cargado
$(document).ready(function(){
    $('.sidenav').sidenav();
});

// Función que se ejecuta cuando el documento HTML ha sido completamente cargado
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
});
