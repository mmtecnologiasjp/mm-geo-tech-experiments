function switchMapLanguage(map, platform){
  let defaultLayers = platform.createDefaultLayers({
    lg: 'zh'
  });
  map.setBaseLayer(defaultLayers.vector.normal.map);
  var ui = H.ui.UI.createDefault(map, defaultLayers, 'zh-CN');

  ui.removeControl('mapsettings');
}




var platform = new H.service.Platform({
  apikey: window.apikey
});
var pixelRatio = window.devicePixelRatio || 1;
var defaultLayers = platform.createDefaultLayers({
  tileSize: pixelRatio === 1 ? 256 : 512,
  ppi: pixelRatio === 1 ? undefined : 320
});

var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map,{
  center: {lat:22.2783, lng:114.1588},
  zoom: 12,
  pixelRatio: pixelRatio
});
window.addEventListener('resize', () => map.getViewPort().resize());

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

switchMapLanguage(map, platform);
