<?php
$lib_url = 'http://maps.google.com/maps/api/js?sensor=false';
drupal_add_js($lib_url, 'external');
drupal_add_js(drupal_get_path('module', 'direccionmap') .'/js/direccion-map.js');
drupal_add_css(drupal_get_path('module', 'direccionmap') .'/css/direccion-map.css');
?>

<div id="map_contact" style="width:<?php echo $width; ?>; height:<?php echo $height; ?>"></div>
<script>
(function ($) {
    $(document).ready(function(){
      cargar_gmap("<?php echo $latitud; ?>", "<?php echo $longitud; ?>", "<?php echo $descripcion; ?>", <?php echo $zoom; ?> );
    });
})(jQuery);
</script>