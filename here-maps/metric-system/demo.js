function useImperialMeasurements(map, defaultLayers){
  var ui = H.ui.UI.createDefault(map, defaultLayers);

  ui.setUnitSystem(H.ui.UnitSystem.IMPERIAL);
}

var platform = new H.service.Platform({
  apikey: window.apikey
});
var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map,{
  center: {lat:42.3572, lng:-71.0596},
  zoom: 14,
  pixelRatio: window.devicePixelRatio || 1
});
window.addEventListener('resize', () => map.getViewPort().resize());

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

useImperialMeasurements(map, defaultLayers);
