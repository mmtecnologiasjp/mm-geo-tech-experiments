function synchronizeMaps(firstMap, secondMap) {
  var viewModel1 = firstMap.getViewModel(),
      viewModel2 = secondMap.getViewModel();

  firstMap.addEventListener('mapviewchange', function() {
    viewModel2.setLookAtData(viewModel1.getLookAtData());
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
  center: {lat: 53.430, lng: -2.961},
  zoom: 7,
  pixelRatio: window.devicePixelRatio || 1
});
window.addEventListener('resize', () => map.getViewPort().resize());

var staticMap = new H.Map(staticMapContainer,
  defaultLayersSync.vector.normal.map,{
  center: {lat: 53.430, lng: -2.961},
  zoom: 7,
  pixelRatio: window.devicePixelRatio || 1
});

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

synchronizeMaps(map, staticMap);
