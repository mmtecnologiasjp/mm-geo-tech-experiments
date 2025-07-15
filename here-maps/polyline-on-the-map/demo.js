function addPolylineToMap(map) {
  var lineString = new H.geo.LineString();

  lineString.pushPoint({lat:53.3477, lng:-6.2597});
  lineString.pushPoint({lat:51.5008, lng:-0.1224});
  lineString.pushPoint({lat:48.8567, lng:2.3508});
  lineString.pushPoint({lat:52.5166, lng:13.3833});

  map.addObject(new H.map.Polyline(
    lineString, { style: { lineWidth: 4 }}
  ));
}

var platform = new H.service.Platform({
  apikey: window.apikey
});
var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map,{
  center: {lat:52, lng:5},
  zoom: 5,
  pixelRatio: window.devicePixelRatio || 1
});
window.addEventListener('resize', () => map.getViewPort().resize());
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

var ui = H.ui.UI.createDefault(map, defaultLayers);

addPolylineToMap(map);