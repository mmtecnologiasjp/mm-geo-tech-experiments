function addPolygonToMap(map) {
  var geoPolygon = new H.geo.Polygon(
    new H.geo.LineString([52, 13, 100, 48, 2, 100, 48, 16, 100, 52, 13, 100]),
    [ 
      new H.geo.LineString([48.5, 4.5, 0, 49.5, 8, 0, 48.5, 9, 0]),
      new H.geo.LineString([48.5, 15, 0, 50, 11, 0, 51, 13, 0])
    ]
  );
  map.addObject(
    new H.map.Polygon(geoPolygon, {
      style: {
        fillColor: '#FFFFCC',
        strokeColor: '#829',
        lineWidth: 8
      }
    })
  );
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

addPolygonToMap(map);
