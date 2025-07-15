
function orderMarkers() {
  var zIndex = 1,
      marker = new H.map.Marker(
        {lat: 52.508249, lng: 13.338931}
      ),
      marker2 = new H.map.Marker(
        {lat: 52.506682, lng: 13.332107}
      ),
      marker3 = new H.map.Marker(
        {lat: 52.503730, lng: 13.331678}
      ),
      marker4 = new H.map.Marker(
        {lat: 52.531, lng: 13.380}
      );

  map.addObjects([marker, marker2, marker3, marker4]);

  map.addEventListener('tap', function (evt) {
    if (evt.target instanceof H.map.Marker) {
      evt.target.setZIndex(zIndex++);
    }
  });
}
var platform = new H.service.Platform({
  apikey: window.apikey
});
var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map,{
  center: {lat: 52.5, lng: 13.4},
  zoom: 10,
  pixelRatio: window.devicePixelRatio || 1
});
window.addEventListener('resize', () => map.getViewPort().resize());

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

orderMarkers();