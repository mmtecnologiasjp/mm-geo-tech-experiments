function createResizableCircle(map) {
  var circle = new H.map.Circle(
        {lat: 50, lng: 22.8},
        85000,
        {
          style: {fillColor: 'rgba(250, 250, 0, 0.7)', lineWidth: 0}
        }
      ),
      circleOutline = new H.map.Polyline(
        circle.getGeometry().getExterior(),
        {
          style: {lineWidth: 8, strokeColor: 'rgba(255, 0, 0, 0)'}
        }
      ),
      circleGroup = new H.map.Group({
        volatility: true, 
        objects: [circle, circleOutline]
      }),
      circleTimeout;

  circle.draggable = true;
  circleOutline.draggable = true;

  circleOutline.getGeometry().pushPoint(circleOutline.getGeometry().extractPoint(0));

  map.addObject(circleGroup);

  circleGroup.addEventListener('pointerenter', function(evt) {
    var currentStyle = circleOutline.getStyle(),
        newStyle = currentStyle.getCopy({
          strokeColor: 'rgb(255, 0, 0)'
        });

    if (circleTimeout) {
      clearTimeout(circleTimeout);
      circleTimeout = null;
    }
    circleOutline.setStyle(newStyle);
  }, true);

  circleGroup.addEventListener('pointerleave', function(evt) {
    var currentStyle = circleOutline.getStyle(),
        newStyle = currentStyle.getCopy({
          strokeColor: 'rgba(255, 0, 0, 0)'
        }),
        timeout = (evt.currentPointer.type == 'touch') ? 1000 : 0;

    circleTimeout = setTimeout(function() {
      circleOutline.setStyle(newStyle);
    }, timeout);
    document.body.style.cursor = 'default';
  }, true);

  circleGroup.addEventListener('pointermove', function(evt) {
    if (evt.target instanceof H.map.Polyline) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'default'
    }
  }, true);

  circleGroup.addEventListener('drag', function(evt) {
    var pointer = evt.currentPointer,
        distanceFromCenterInMeters = circle.getCenter().distance(map.screenToGeo(pointer.viewportX, pointer.viewportY));

    if (evt.target instanceof H.map.Polyline) {
      circle.setRadius(distanceFromCenterInMeters);

      var outlineLinestring = circle.getGeometry().getExterior();

      outlineLinestring.pushPoint(outlineLinestring.extractPoint(0));
      circleOutline.setGeometry(outlineLinestring);

      evt.stopPropagation();
    }
  }, true);
}

var platform = new H.service.Platform({
  apikey: window.apikey
});
var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map, {
  center: {lat: 50, lng: 22.8},
  zoom: 6,
  pixelRatio: window.devicePixelRatio || 1
});
window.addEventListener('resize', () => map.getViewPort().resize());

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

var ui = H.ui.UI.createDefault(map, defaultLayers, 'en-US');

createResizableCircle(map);
