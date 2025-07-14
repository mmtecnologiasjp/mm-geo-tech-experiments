function calculateRouteFromAtoB (platform) {
  var router = platform.getRoutingService(null, 8),
      routeRequestParams = {
        routingMode: 'fast',
        transportMode: 'bicycle',
        origin: '-16.1647142,-67.7229166',
        destination: '-16.3705847,-68.0452683',
        return: 'polyline,elevation' 
      };

  router.calculateRoute(
    routeRequestParams,
    onSuccess,
    onError
  );
}

function onSuccess(result) {
  var route = result.routes[0];
  route.sections.forEach((section) => {
    let lineString = H.geo.LineString.fromFlexiblePolyline(section.polyline),
        group = new H.map.Group(),
        dict = {},
        polyline;

    let coords = lineString.getLatLngAltArray();

    for (let i = 2, len = coords.length; i < len; i += 3) {
      let elevation = coords[i];

      var p = (elevation - 1000) / (4700 - 1000);
      var r = Math.round(255 * p);
      var b = Math.round(255 - 255 * p);

      var icon;
      if (dict[r + '_' + b]) {
        icon = dict[r + '_' + b];
      } else {
        var canvas = document.createElement('canvas');
        canvas.width = 4;
        canvas.height = 4;

        var ctx = canvas.getContext('2d'); 
        ctx.fillStyle = 'rgb(' + r + ', 0, ' + b + ')';
        ctx.fillRect(0, 0, 4, 4);
        icon = new H.map.Icon(canvas);
        dict[r + '_' + b] = icon;
      }

      var marker = new H.map.Marker({
        lat: coords[i - 2], lng: coords[i - 1], alt: elevation
      }, {icon: icon});
      group.addObject(marker);
    }

    polyline = new H.map.Polyline(lineString, {
      style: {
        lineWidth: 2,
        strokeColor: '#555555'
      }
    });
    map.addObject(polyline);
    map.addObject(group);
    map.getViewModel().setLookAtData({
      bounds: polyline.getBoundingBox(),
      tilt: 60
    });
  });
}
function onError(error) {
  alert('Can\'t reach the remote server');
}

var mapContainer = document.getElementById('map'),
  routeInstructionsContainer = document.getElementById('panel');
var platform = new H.service.Platform({
  apikey: window.apikey
});

var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(mapContainer,
  defaultLayers.vector.normal.map,{
  center: {lat:52.5160, lng:13.3779},
  zoom: 13,
  pixelRatio: window.devicePixelRatio || 1
});
window.addEventListener('resize', () => map.getViewPort().resize());

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

var ui = H.ui.UI.createDefault(map, defaultLayers);

calculateRouteFromAtoB (platform);
