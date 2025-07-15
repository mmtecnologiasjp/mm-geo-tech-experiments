function showGeoJSONData (map) {
  var reader = new H.data.geojson.Reader('data/berlin.json', {
    style: function (mapObject) {
      if (mapObject instanceof H.map.Polygon) {
        mapObject.setStyle({
          fillColor: 'rgba(255, 0, 0, 0.5)',
          strokeColor: 'rgba(0, 0, 255, 0.2)',
          lineWidth: 3
        });
      }
    }
  });

  reader.parse();
  map.addLayer(reader.getLayer());
}

var platform = new H.service.Platform({
  apikey: window.apikey
});
var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(document.getElementById('map'), defaultLayers.vector.normal.map, {
  zoom: 10,
  center: {lat: 52.522763341087874, lng: 13.492702024100026},
  pixelRatio: window.devicePixelRatio || 1
});
window.addEventListener('resize', () => map.getViewPort().resize());

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

var ui = H.ui.UI.createDefault(map, defaultLayers);

showGeoJSONData(map);