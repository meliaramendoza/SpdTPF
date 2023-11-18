// Función que se ejecuta cuando el documento HTML ha sido completamente cargado
$(document).ready(function(){
    $('.sidenav').sidenav();
});

// Función que maneja la apertura y cierre del menú desplegable en el encabezado
$(function() {
    var $document = $(document),
        $header = {
            drawerToggle : $('.header-drawer-toggle')
        },
        $drawer = {
            this : $('.layout-drawer'),
            dropdownToggle : $('.drawer-dropdown-toggle')
        }
    $header.drawerToggle.click(function() {
        // Alterna la clase 'is-open' para mostrar o ocultar el menú desplegable en el encabezado
        $drawer.this.toggleClass('is-open');
    });
    $document.keyup(function(e) {
        // Cierra el menú desplegable si se presiona la tecla 'Esc' 
        if (e.keyCode == 27) {
            if ($drawer.this.hasClass('is-open')) {
                $drawer.this.removeClass('is-open');
            }
        }
    });
    $document.mouseup(function(e) {
        // Cierra el menú desplegable si se hace clic fuera de él
        if(!$drawer.this.is(e.target) &&
           $drawer.this.has(e.target).length === 0)
        {
            if ($drawer.this.hasClass('is-open')) {
                $drawer.this.removeClass('is-open');
            }
        }
    });
    $drawer.dropdownToggle.each(function() {
        // Agrega un controlador de clic para los elementos que tienen la clase 'drawer-dropdown-toggle'
        var target = $(this).data('target');
        $(this).click(function() {
            // Desliza hacia arriba o hacia abajo el elemento objetivo asociado al hacer clic
            $(target).slideToggle(300);
        });
    });
});

// Función que se ejecuta cuando el documento HTML ha sido completamente cargado
$(document).ready(function(){
    $('.sidenav').sidenav();
    // Maneja el evento de clic en los enlaces de la barra de navegación y redirige a las páginas correspondientes
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
