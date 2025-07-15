function addRectangleToMap(map) {
  var boundingBox = new H.geo.Rect(53.1, 13.1, 43.1, 40.1);
  map.addObject(
    new H.map.Rect(boundingBox, {
      style: {
        fillColor: '#FFFFCC',
        strokeColor: '#E8FA75',
        lineWidth: 8
      },
    })
  );
}

var platform = new H.service.Platform({
  apikey: window.apikey
});
var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map,{
  center: {lat: 53.1, lng: 13.1},
  zoom: 3,
  pixelRatio: window.devicePixelRatio || 1
});
window.addEventListener('resize', () => map.getViewPort().resize());

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

addRectangleToMap(map);