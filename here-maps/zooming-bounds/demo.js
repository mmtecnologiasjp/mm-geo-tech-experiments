function setUpCustomZooming(map) {
  var clevelandCircle = new H.map.Circle(
    new H.geo.Point(41.4822, -81.6697), 
    11703, 
    {style: {fillColor: 'rgba(0, 255, 221, 0.66)'}}
  );
  var torontoCircle = new H.map.Circle(
    new H.geo.Point(43.7000, -79.4000), 
    75090, 
    {style: {fillColor: 'rgba(0, 255, 221, 0.66)'}}
  );
  var chicagoCircle = new H.map.Circle(
    new H.geo.Point(41.8369, -87.6847), 
    81570, 
    {style: {fillColor: 'rgba(0, 221, 255, 0.66)'}}
  );
  var newYorkCircle = new H.map.Circle(
    new H.geo.Point(40.7127, -74.0059), 
    252180, 
    {style: {fillColor: 'rgba(221, 0, 255, 0.66)'}}
  );
  clevelandCircle.setData({maxZoom: 7});
  torontoCircle.setData({maxZoom: 5});
  chicagoCircle.setData({maxZoom: 5});
  newYorkCircle.setData({maxZoom: 4});

  var container = new H.map.Group({
    objects: [clevelandCircle, torontoCircle, chicagoCircle, newYorkCircle]
  });
  container.addEventListener('tap', function (evt) {
    var target = evt.target;
    var maxZoom = target.getData().maxZoom;
    map.getViewModel().setLookAtData({
      zoom: maxZoom,
      bounds: target.getBoundingBox()
    });
  });

  map.addObject(container);
}


var platform = new H.service.Platform({
  apikey: window.apikey
});
var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(document.getElementById('map'), defaultLayers.vector.normal.map, {
  center: new H.geo.Point(41.4822, -81.6697),
  zoom: 4,
  pixelRatio: window.devicePixelRatio || 1
});
window.addEventListener('resize', () => map.getViewPort().resize());

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

setUpCustomZooming(map);