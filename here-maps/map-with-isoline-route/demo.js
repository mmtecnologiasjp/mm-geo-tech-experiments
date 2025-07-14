function calculateIsolineRoute(platform) {
  var router = platform.getRoutingService(null, 8),
      routeRequestParams = {
        'origin': '52.51605,13.37787',
        'range[type]': 'consumption',
        'range[values]': 20000,
        'transportMode': 'car',
        'ev[freeFlowSpeedTable]': '0,0.239,27,0.239,45,0.259,60,0.196,75,0.207,90,0.238,100,0.26,110,0.296,120,0.337,130,0.351,250,0.351',
        'ev[trafficSpeedTable]': '0,0.349,27,0.319,45,0.329,60,0.266,75,0.287,90,0.318,100,0.33,110,0.335,120,0.35,130,0.36,250,0.36',
        'ev[ascent]': 9,
        'ev[descent]': 4.3,
        'ev[auxiliaryConsumption]': 1.8
      };

  map.addObject(new H.map.Marker({
    lat: 52.51605,
    lng: 13.37787
  }));

  router.calculateIsoline(
    routeRequestParams,
    onSuccess,
    onError
  );
}

function onSuccess(result) {
  var route = result.isolines[0];

  addRouteShapeToMap(route);
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
  defaultLayers.vector.normal.map, {
  center: {lat: 52.5160, lng: 13.3779},
  zoom: 13,
  pixelRatio: window.devicePixelRatio || 1
});

window.addEventListener('resize', () => map.getViewPort().resize());

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

var ui = H.ui.UI.createDefault(map, defaultLayers);

function addRouteShapeToMap(route) {
  route.polygons.forEach((section) => {
    let linestring = H.geo.LineString.fromFlexiblePolyline(section.outer);

    let polygon = new H.map.Polygon(linestring, {
      style: {
        lineWidth: 4,
        strokeColor: 'rgba(0, 128, 0, 0.7)'
      }
    });

    map.addObject(polygon);
    map.getViewModel().setLookAtData({
      bounds: polygon.getBoundingBox()
    });
  });
}

calculateIsolineRoute(platform);
