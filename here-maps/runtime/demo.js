
function changeFeatureStyle(map){
  
  var provider = map.getBaseLayer().getProvider();

  var parkStyle = provider.getStyle();

  var changeListener = (evt) => {
    if (parkStyle.getState() === H.map.Style.State.READY) {
      parkStyle.removeEventListener('change', changeListener);
      var parkConfig = parkStyle.extractConfig(['landuse.park', 'landuse.builtup']);
      parkConfig.layers.landuse.park.draw.polygons.color = '#2ba815'
      parkConfig.layers.landuse.builtup.draw.polygons.color = '#676d67'

      parkStyle.mergeConfig(parkConfig);
    }
  };

  parkStyle.addEventListener('change', changeListener);
}

var platform = new H.service.Platform({
  apikey: window.apikey
});
var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map, {
  center: {lat: 52.51477270923461, lng: 13.39846691425174},
  zoom: 13,
  pixelRatio: window.devicePixelRatio || 1
});
window.addEventListener('resize', () => map.getViewPort().resize());

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

var ui = H.ui.UI.createDefault(map, defaultLayers);

changeFeatureStyle(map);