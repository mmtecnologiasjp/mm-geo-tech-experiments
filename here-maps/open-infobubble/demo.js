function addMarkerToGroup(group, coordinate, html) {
  var marker = new H.map.Marker(coordinate);
  marker.setData(html);
  group.addObject(marker);
}

function addInfoBubble(map) {
  var group = new H.map.Group();

  map.addObject(group);

  group.addEventListener('tap', function (evt) {
    var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
      content: evt.target.getData()
    });
    ui.addBubble(bubble);
  }, false);

  addMarkerToGroup(group, {lat: 53.439, lng: -2.221},
    '<div><a href="https://www.mcfc.co.uk" target="_blank">Manchester City</a></div>' +
    '<div>City of Manchester Stadium<br />Capacity: 55,097</div>');

  addMarkerToGroup(group, {lat: 53.430, lng: -2.961},
    '<div><a href="https://www.liverpoolfc.tv" target="_blank">Liverpool</a></div>' +
    '<div>Anfield<br />Capacity: 54,074</div>');
}
var platform = new H.service.Platform({
  apikey: window.apikey
});
var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map, {
  center: {lat: 53.430, lng: -2.961},
  zoom: 7,
  pixelRatio: window.devicePixelRatio || 1
});

window.addEventListener('resize', () => map.getViewPort().resize());

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

var ui = H.ui.UI.createDefault(map, defaultLayers);

addInfoBubble(map);
