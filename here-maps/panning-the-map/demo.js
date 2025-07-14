function panTheMap(map) {
  var viewPort,
      incX = 1,
      incY = 2,
      x = 100,
      y = 100;

  var viewPort = map.getViewPort(),
      pan = function() {
        x = x + incX;
        if (Math.abs(x) > 100) {
          incX = -incX;
        }

        y = y + incY;
        if (Math.abs(y) > 100) {
          incY = -incY;
        }

        viewPort.interaction(x, y);
      };
  viewPort.startInteraction(H.map.render.RenderEngine.InteractionModifiers.COORD, 0, 0);
  setInterval(pan, 15);
}
var platform = new H.service.Platform({
  apikey: window.apikey
});
var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map,{
  center: {lat: 19.11, lng: 72.89},
  zoom: 4,
  pixelRatio: window.devicePixelRatio || 1
});
window.addEventListener('resize', () => map.getViewPort().resize());

panTheMap(map);