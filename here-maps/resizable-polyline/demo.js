function createResizablePolyline(map) {
  var svgCircle = '<svg width="20" height="20" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
      '<circle cx="10" cy="10" r="7" fill="transparent" stroke="red" stroke-width="4"/>' +
      '</svg>',
      polyline = new H.map.Polyline(
        new H.geo.LineString([51.6, 21.8, 0, 52.3, 24, 0, 51.7, 25.8, 0, 50.6, 26, 0, 50, 24.3, 0, 49.2, 23.2, 0, 48, 23.2, 0]),
        {
          style: {fillColor: 'rgba(150, 100, 0, .8)', lineWidth: 10}
        }
      ),
      verticeGroup = new H.map.Group({
        visibility: false
      }),
      mainGroup = new H.map.Group({
        volatility: true, 
      }),
      polylineTimeout;

  polyline.draggable = true;

  polyline.getGeometry().eachLatLngAlt(function(lat, lng, alt, index) {
    var vertice = new H.map.Marker(
      {lat, lng},
      {
        icon: new H.map.Icon(svgCircle, {anchor: {x: 10, y: 10}})
      }
    );
    vertice.draggable = true;
    vertice.setData({'verticeIndex': index})
    verticeGroup.addObject(vertice);
  });

  map.addObject(mainGroup);

  mainGroup.addEventListener('pointerenter', function(evt) {
    if (polylineTimeout) {
      clearTimeout(polylineTimeout);
      polylineTimeout = null;
    }

    verticeGroup.setVisibility(true);
  }, true);

  mainGroup.addEventListener('pointerleave', function(evt) {
    var timeout = (evt.currentPointer.type == 'touch') ? 1000 : 0;

    polylineTimeout = setTimeout(function() {
      verticeGroup.setVisibility(false);
    }, timeout);
  }, true);

  verticeGroup.addEventListener('pointerenter', function(evt) {
    document.body.style.cursor = 'pointer';
  }, true);

  verticeGroup.addEventListener('pointerleave', function(evt) {
    document.body.style.cursor = 'default';
  }, true);

  verticeGroup.addEventListener('drag', function(evt) {
    var pointer = evt.currentPointer,
        geoLineString = polyline.getGeometry(),
        geoPoint = map.screenToGeo(pointer.viewportX, pointer.viewportY);

    evt.target.setGeometry(geoPoint);

    geoLineString.removePoint(evt.target.getData()['verticeIndex']);
    geoLineString.insertPoint(evt.target.getData()['verticeIndex'], geoPoint);
    polyline.setGeometry(geoLineString);

    evt.stopPropagation();
  }, true);
}

var platform = new H.service.Platform({
  apikey: window.apikey
});
var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map, {
  center: {lat: 50, lng: 24},
  zoom: 6,
  pixelRatio: window.devicePixelRatio || 1
});
window.addEventListener('resize', () => map.getViewPort().resize());

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

var ui = H.ui.UI.createDefault(map, defaultLayers, 'en-US');

createResizablePolyline(map);
