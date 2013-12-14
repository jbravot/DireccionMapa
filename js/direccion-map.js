/***************************************
JavaScript para Direccion Mapas
Version: 1.5 - 2013
author: @jbravot (jonathan Bravo)
email: info@jonathanbravo.com
web: jonathanbravo.com
****************************************/
/*
	VARIABLES GLOBALES
*/
var map;
var marker;
var infowindow = new google.maps.InfoWindow({
    content: ''
});

/***************************************
Funcion para crear el mapa
****************************************/
function cargar_gmap(latitud, longitud,descripcion,zoom){
    var myOptions = {
      zoom: parseInt(zoom),
      center: new google.maps.LatLng(latitud,longitud),
      mapTypeControl: true,
      streetViewControl: false,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
      },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    map = new google.maps.Map(document.getElementById("map_contact"), myOptions);

    crearPuntoInfowindows(descripcion,latitud,longitud);
}
/**************************
Funcion Para crear un punto con una ventana de informacion
***************************/
function crearPuntoInfowindows(descripcion,latitud,longitud){
  crearPunto(parseFloat(latitud),parseFloat(longitud));
	(function(marker, descripcion){
		google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent("<strong>"+descripcion+"</strong>");
            infowindow.open(map, marker);
        });
    })(marker,descripcion);
  return marker;
}
/**************************
Funcion Para crear un punto
***************************/
function crearPunto(latitud,longitud){
	var point = new google.maps.LatLng(latitud, longitud);
	marker = new google.maps.Marker({
		animation: google.maps.Animation.DROP,
		map: map,
		position: point
	});
	return marker;
}
(function ($) {
    $(document).ready(function(){
      cargar_gmap(Drupal.settings.direccionmap.latitud, Drupal.settings.direccionmap.longitud, Drupal.settings.direccionmap.descripcion, Drupal.settings.direccionmap.zoom);
    });
})(jQuery);