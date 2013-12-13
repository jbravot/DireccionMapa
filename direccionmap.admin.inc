<?php
/**
 * @file
 * Callbacks de administración del módulo direccionmap.
 */

/**
 * Define el formulario de opciones de configuración.
 */
function direccionmap_configuracion() {
  $lib_url = 'http://maps.google.com/maps/api/js?sensor=false';
  drupal_add_js($lib_url, 'external');
  drupal_add_js(drupal_get_path('module', 'direccionmap') .'/js/direccion-map-admin.js');
  drupal_add_css(drupal_get_path('module', 'direccionmap') .'/css/direccion-map.css');
  
  $form['info'] = array(
    '#type' => 'fieldset',
    '#title' => 'Informaci&oacute;n',
    '#collapsible' => FALSE,
	'#prefix' => '<div id="map_canvas"></div>',
	'#suffix' => '<script>(function ($){$(document).ready(function(){cargar_gmap("'.variable_get('direccionmap_latitud', '-2.1328').'", "'.variable_get('direccionmap_longitud', '-79.9058').'");});})(jQuery);</script>',
  ); 
  $form['info']['direccionmap_direccion'] = array(
    '#title' => 'Direcci&oacute;n',  
    '#type' => 'textfield',
    '#default_value' => variable_get('direccionmap_direccion', 'Direccion'),
    '#description' => 'Para Mayor precisi&oacute;n agregu&eacute; la ciudad y el pa&iacute;s. <br>Arrastre el marcador y busque su direcci&oacute;n en el mapa.',
    '#required' => TRUE,
	'#suffix' => '<a id="go-map" class="button btn-map">'.t('Pasar Direcci&oacute;n al Mapa').'</a>',
  );
  $form['info']['direccionmap_descripcion'] = array(
    '#title' => 'Descripci&oacute;n',  
    '#type' => 'textfield',
    '#default_value' => variable_get('direccionmap_descripcion', ''), 
    '#description' => 'T&iacute;tulo que se mostrar&aacute; en la ventana del mapa.',
	'#required' => TRUE,  
  );
  $form['mapinfo'] = array(
    '#type' => 'fieldset',
    '#title' => 'Tama&ntilde;o del Mapa',
    '#collapsible' => TRUE,
  );
  
  $zoom_levels = array('0' => t('0 - Minimo nivel de Zoom'));
  for ($i = 1; $i < 20; $i++) {
    $zoom_levels["$i"] = "$i";
  }
  $zoom_levels['20'] = t('20 - Maximo nivel de Zoom');

  $form['mapinfo']['direccionmap_zoom'] = array('#type' => 'select',
    '#title' => t('Nivel de zoom del mapa'),
    '#default_value' => variable_get('direccionmap_zoom', '15'),
    '#description' => 'Nivel de Zoom del mapa, se recomienda un valor de 15',
    '#options' => $zoom_levels,
  );

  $form['mapinfo']['direccionmap_width'] = array('#type' => 'textfield',
    '#title' => t('Mapa Width'),
    '#default_value' => variable_get('direccionmap_width', '100%'),
    '#description' => 'El valor puede ser en pixeles (px) o en porcentaje (%)',
    '#size' => 10,
  );

  $form['mapinfo']['direccionmap_height'] = array('#type' => 'textfield',
    '#title' => t('Mapa Height'),
    '#default_value' => variable_get('direccionmap_height', '250px'),
    '#description' => 'El valor puede ser en pixeles (px) o en porcentaje (%)',
    '#size' => 10,
  );
  $form['geoinfo'] = array(
    '#type' => 'fieldset',
    '#title' => 'Informaci&oacute;n Geografica',
    '#collapsible' => TRUE,
	'#collapsed' => TRUE,
  );
  $form['geoinfo']['direccionmap_latitud'] = array(
    '#title' => 'Latitud',  
    '#type' => 'textfield',
    '#default_value' => variable_get('direccionmap_latitud', '-2.1328'),
	'#size' => 20,
    '#required' => TRUE,  	
  );
  $form['geoinfo']['direccionmap_longitud'] = array(
    '#title' => 'Longitud',  
    '#type' => 'textfield',
    '#default_value' => variable_get('direccionmap_longitud', '-79.9058'),
	'#size' => 20,
    '#required' => TRUE,  	
  );
   
  return system_settings_form($form);
}
