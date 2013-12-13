/***************************************
JavaScript para Direccion Mapas Administrador
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
var selectedmarker;
var geocoder = new google.maps.Geocoder();

/***************************************
Funcion para crear el mapa
****************************************/
function cargar_gmap(latitud, longitud){
    var myOptions = {
      zoom: 15,
      center: new google.maps.LatLng(latitud,longitud),
      mapTypeControl: true,
      streetViewControl: false,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
      },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    createPointToEdit(latitud,longitud);
}
/***************************************
Funcion para crear un punto editable
****************************************/
function createPointToEdit(latitud, longitud)
{
  marker = markerdraggable(latitud, longitud);
  marker.setMap(map);
  selectedmarker = marker;
  map.setCenter(marker.getPosition());
}
/***************************************
Creates a draggable marker and updates the needed fields
Used in post, but it doesn't work
****************************************/
function markerdraggable(lat,lon) {
    var thismarker;
    var myLatLng = new google.maps.LatLng(lat, lon);
    var marker = new google.maps.Marker({
          draggable: true,
          animation: google.maps.Animation.DROP,
          position: myLatLng,
          map: map,
        });

    var options = {};

    thismarker = marker;

    google.maps.event.addListener(thismarker, "dragstart", function() {
                   selectedmarker = thismarker;
                });
    google.maps.event.addListener(thismarker, "dragend", function() {
                   fill_id_coords();
                });
    markerdraggable_listener = google.maps.event.addListener(map, "click", function(){
                   fill_id_coords();
                });
  return thismarker;
}
/**************************
Fills the needed field in the form, when posting
***************************/
function fill_id_coords() {
	// this is the function who fill the coords in POST process
    lon = selectedmarker.getPosition().lng();
    lat = selectedmarker.getPosition().lat();

    var element_lat = document.getElementById("edit-direccionmap-latitud");
    var element_lon = document.getElementById("edit-direccionmap-longitud");

    element_lat.value = lat;
    element_lon.value = lon;
}
/***************************************
Funcion que detecta el geocode
****************************************/
function geocodePosition() {

  address = document.getElementById("edit-direccionmap-direccion").value;

  geocoder.geocode( { 'address': address}, function(results, status) {

    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      marker.setPosition(results[0].geometry.location);
      fill_id_coords();
    } else {
      alert("No podemos encontrar la direcci&oacute;n, error: " + status);
    }
  });
}
(function ($){
$(document).ready(function(){
	$('#go-map').click(function (){
		geocodePosition();
		return false;
	});
});
})(jQuery);