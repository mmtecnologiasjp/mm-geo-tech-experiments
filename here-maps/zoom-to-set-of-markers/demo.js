

function addMarkersAndSetViewBounds() {

  var toronto = new H.map.Marker({lat:43.7,  lng:-79.4}),
      boston = new H.map.Marker({lat:42.35805, lng:-71.0636}),
      washington = new H.map.Marker({lat:38.8951, lng:-77.0366}),
      group = new H.map.Group();

 
  group.addObjects([toronto, boston, washington]);
  map.addObject(group);


  map.getViewModel().setLookAtData({
    bounds: group.getBoundingBox()
  });
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

addMarkersAndSetViewBounds(map);