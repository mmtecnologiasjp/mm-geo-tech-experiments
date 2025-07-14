function testObjectsEvents(map, logEvent) {
  var style = {
    fillColor: 'rgba(35, 51, 129, 0.3)',
    lineWidth: 5,
    strokeColor: 'rgba(114, 38, 51, 1)'
  };

  var rect = new H.map.Rect(new H.geo.Rect(
    51.5072, 0, 48.8567, 2.3508
  ), {style: style});

  var circle = new H.map.Circle(
    new H.geo.Point(52.3667, 4.9000), 
    198000, 
    {style: style}
  );

  var polyline = new H.map.Polyline(new H.geo.LineString([
    52.5167, 13.3833, 0,
    50.0833, 14.4167, 0,
    52.2333, 21.0167, 0
  ]), {style: style});

  var polygon = new H.map.Polygon(new H.geo.LineString([
    45.4667, 9.1833, 0,
    48.1333, 11.566, 0,
    50.0800, 8.2400, 0,
  ]), {style: style});

  var standardMarker = new H.map.Marker(new H.geo.Point(48.2000, 16.3667));

  var imageMarker = new H.map.Marker(new H.geo.Point(53.5653, 10.0014), {
    icon: new H.map.Icon('img/marker-house.png')
  });

  rect.setData('Rect');
  circle.setData('Circle');
  polyline.setData('Polyline');
  polygon.setData('Polygon');
  standardMarker.setData('Standard Marker');
  imageMarker.setData('Image Marker');

  var container = new H.map.Group({
    objects: [rect, circle, polyline, polygon, standardMarker, imageMarker]
  });

  rect.addEventListener('pointerenter', logEvent);
  rect.addEventListener('pointerdown', logEvent);
  circle.addEventListener('pointermove', logEvent);
  circle.addEventListener('pointerup', logEvent);
  polyline.addEventListener('pointermove', logEvent);
  polygon.addEventListener('tap', logEvent);
  polygon.addEventListener('longpress', logEvent);
  standardMarker.addEventListener('tap', logEvent);
  standardMarker.addEventListener('pointerleave', logEvent);
  imageMarker.addEventListener('pointerenter', logEvent);
  imageMarker.addEventListener('pointerleave', logEvent);
  imageMarker.addEventListener('dbltap', logEvent);

  map.addObject(container);
}

var platform = new H.service.Platform({
  apikey: window.apikey
});
var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(document.getElementById('map'), defaultLayers.vector.normal.map, {

  center: new H.geo.Point(51, 7),
  zoom: 5,
  pixelRatio: window.devicePixelRatio || 1
});
window.addEventListener('resize', () => map.getViewPort().resize());

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

var ui = H.ui.UI.createDefault(map, defaultLayers, 'en-US');

var logContainer = document.createElement('ul');
logContainer.className ='log';
logContainer.innerHTML = '<li class="log-entry">Try clicking on elements</li>';
map.getElement().appendChild(logContainer);

function logEvent(evt) {
  var entry = document.createElement('li');
  entry.className = 'log-entry';
  entry.textContent = ['event "', evt.type, '" @ '+ evt.target.getData()].join('');
  logContainer.insertBefore(entry, logContainer.firstChild);
}
testObjectsEvents(map, logEvent);