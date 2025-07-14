function displayBounds(firstMap, secondMap) {
  
  var viewModel1 = firstMap.getViewModel(),
      viewModel2 = secondMap.getViewModel(),
      polygon,
      marker;

  polygon = new H.map.Polygon(viewModel1.getLookAtData().bounds, {
    volatility: true
  });
  marker = new H.map.Marker(viewModel1.getLookAtData().position, {
    volatility: true
  });
  staticMap.addObject(polygon);
  staticMap.addObject(marker)

  firstMap.addEventListener('mapviewchange', function() {
    var data = viewModel1.getLookAtData();
    viewModel2.setLookAtData({
      position: data.position,
      zoom: data.zoom - 2
    });

    polygon.setGeometry(data.bounds);
    marker.setGeometry(data.position);
  });
}

var platform = new H.service.Platform({
  apikey: window.apikey
});
var defaultLayers = platform.createDefaultLayers();
var defaultLayersSync = platform.createDefaultLayers();


var mapContainer = document.createElement('div');
var staticMapContainer = document.createElement('div');

mapContainer.style.height = '300px';

staticMapContainer.style.position = 'absolute';
staticMapContainer.style.width = '600px';
staticMapContainer.style.height = '300px';

document.getElementById('map').appendChild(mapContainer);
document.getElementById('panel').appendChild(staticMapContainer);

var map = new H.Map(mapContainer,
  defaultLayers.vector.normal.map,{
  center: {lat: 52.5206970, lng: 13.40927320},
  zoom: 16,
  pixelRatio: window.devicePixelRatio || 1
});
window.addEventListener('resize', () => map.getViewPort().resize());

map.getViewModel().setLookAtData({
  tilt: 45,
  heading: 60
});

var staticMap = new H.Map(staticMapContainer,
  defaultLayersSync.vector.normal.map,{
  center: {lat: 53.430, lng: -2.961},
  zoom: 7,
  pixelRatio: window.devicePixelRatio || 1
});

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

displayBounds(map, staticMap);
