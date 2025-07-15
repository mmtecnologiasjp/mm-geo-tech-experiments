function interleave(map){
  var provider = map.getBaseLayer().getProvider();

  var style = provider.getStyle();

  var changeListener = () => {
    if (style.getState() === H.map.Style.State.READY) {
      style.removeEventListener('change', changeListener);

      objectProvider = new H.map.provider.LocalObjectProvider();
      objectLayer = new H.map.layer.ObjectLayer(objectProvider);
      objectProvider.getRootGroup().addObject(new H.map.Circle(map.getCenter(), 500));
      map.addLayer(objectLayer);
      buildings = new H.map.Style(style.extractConfig('buildings'));
      buildingsLayer = platform.getOMVService().createLayer(buildings);
      map.addLayer(buildingsLayer);

      map.addObject(new H.map.Marker(map.getCenter()));
    }
  }

  style.addEventListener('change', changeListener);
}
var platform = new H.service.Platform({
  apikey: window.apikey
});
var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map, {
  center: {lat: 52.51477270923461, lng: 13.39846691425174},
  zoom: 16,
  pixelRatio: window.devicePixelRatio || 1
});
map.getViewModel().setLookAtData({tilt: 45});

window.addEventListener('resize', () => map.getViewPort().resize());
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

interleave(map);