function addOverlayToMap(map) {
  var imgCounter = 0;

  var overlay = new H.map.Overlay(
    new H.geo.Rect(
      70.72849153520343, -24.085683364175395,
      29.569664922291, 44.216452317817016
    ),
    rainRadar[imgCounter],
    {
      volatility: true
    }
  );

  setInterval(function() {
    imgCounter = imgCounter < 10 ? ++imgCounter : 0;
    overlay.setBitmap(rainRadar[imgCounter]);
  }, 250);

  map.addObject(overlay);
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

var rainRadar = [];
(function() {
  var i = 0,
      img;
  for (; i <= 10; i++) {
    img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = 'https://heremaps.github.io/maps-api-for-javascript-examples/image-overlay/data/' + i + '.png';
    rainRadar.push(img);
  }
}());

addOverlayToMap(map);