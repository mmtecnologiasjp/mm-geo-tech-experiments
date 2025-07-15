const routeRequestParams = {
  routingMode: "fast",
  transportMode: "truck",
  origin: "40.7249546323,-74.0110042", // Manhattan
  destination: "40.7324386599,-74.0341396", // Newport
  return: "polyline",
  units: "imperial",
  spans: "truckAttributes",
},
  routes = new H.map.Group();

function calculateRoutes(platform) {
  const router = platform.getRoutingService(null, 8);

  calculateRoute(router, routeRequestParams, {
    strokeColor: "rgba(0, 128, 255, 0.7)",
    lineWidth: 10
  });

  calculateRoute(
    router,
    Object.assign({}, routeRequestParams, {
      "vehicle[axleCount]": 4,
      "vehicle[trailerCount]": 1,
      "vehicle[hazardousGoods]": "flammable"
    }),
    {
      strokeColor: "rgba(255, 0, 255, 0.7)",
      lineWidth: 10
    }
  );
}

function enableVehicleRestrictions(event) {
  if (event.target.getState() === H.map.render.Style.State.READY) {
    event.target.removeEventListener(
      "change",
      enableVehicleRestrictions,
      false
    );
    const features = event.target.getEnabledFeatures();
    event.target.setEnabledFeatures([
      ...features,
      { feature: "vehicle restrictions", mode: "active & inactive" },
    ]);
  }
}
function calculateRoute(router, params, style) {
  router.calculateRoute(
    params,
    function (result) {
      addRouteShapeToMap(style, result.routes[0]);
    },
    console.error
  );
}

const mapContainer = document.getElementById("map");

const platform = new H.service.Platform({
  apikey: window.apikey
});

const engineType = H.Map.EngineType["HARP"];

const defaultLayers = platform.createDefaultLayers({ engineType });

const map = new H.Map(mapContainer, defaultLayers.vector.normal.logistics, {
  engineType,
  center: { lat: 40.74539, lng: -74.022917 },
  zoom: 13.2,
  pixelRatio: window.devicePixelRatio || 1
});
const style = map.getBaseLayer().getProvider().getStyle();

style.addEventListener("change", enableVehicleRestrictions);


window.addEventListener("resize", () => map.getViewPort().resize());

const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

map.addObject(routes);

function addRouteShapeToMap(style, route) {
  route.sections.forEach((section) => {
    const linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);

    const polyline = new H.map.Polyline(linestring, {
      style
    });

    routes.addObject(polyline);
    map.getViewModel().setLookAtData({
      bounds: routes.getBoundingBox()
    });
  });
}

calculateRoutes(platform);
