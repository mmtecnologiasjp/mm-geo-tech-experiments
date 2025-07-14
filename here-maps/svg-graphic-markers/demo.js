function addSVGMarkers(map){
  var svgMarkup = '<svg  width="24" height="24" xmlns="http://www.w3.org/2000/svg">' +
  '<rect stroke="black" fill="${FILL}" x="1" y="1" width="22" height="22" />' +
  '<text x="12" y="18" font-size="12pt" font-family="Arial" font-weight="bold" ' +
  'text-anchor="middle" fill="${STROKE}" >C</text></svg>';

  var bearsIcon = new H.map.Icon(
    svgMarkup.replace('${FILL}', 'blue').replace('${STROKE}', 'red')),
    bearsMarker = new H.map.Marker({lat: 41.8625, lng: -87.6166 },
      {icon: bearsIcon});

  map.addObject(bearsMarker);

  var cubsIcon = new H.map.Icon(
    svgMarkup.replace('${FILL}', 'white').replace('${STROKE}', 'orange')),
    cubsMarker = new H.map.Marker({lat: 41.9483, lng: -87.6555 },
      {icon: cubsIcon});

  map.addObject(cubsMarker);
}

var platform = new H.service.Platform({
  apikey: window.apikey
});
var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map,{
  center: {lat:41.881944, lng:-87.627778},
  zoom: 11,
  pixelRatio: window.devicePixelRatio || 1
});
window.addEventListener('resize', () => map.getViewPort().resize());

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

  var ui = H.ui.UI.createDefault(map, defaultLayers);
addSVGMarkers(map);