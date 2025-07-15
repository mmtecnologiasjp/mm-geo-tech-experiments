function addCircleToMap(map) {
  map.addObject(new H.map.Circle(

    { lat: 28.6071, lng: 77.2127 },

    1000,
    {
      style: {
        strokeColor: 'rgba(55, 85, 170, 0.6)', 
        lineWidth: 2,
        fillColor: 'rgba(0, 128, 0, 0.7)'  
      }
    }
  ));
}

var platform = new H.service.Platform({
  apikey: window.apikey
});
var defaultLayers = platform.createDefaultLayers();


var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map, {
  center: { lat: 28.6071, lng: 77.2127 },
  zoom: 13,
  pixelRatio: window.devicePixelRatio || 1
});

window.addEventListener('resize', () => map.getViewPort().resize());
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));


var ui = H.ui.UI.createDefault(map, defaultLayers);


addCircleToMap(map);