function showPostcodes(map, bubble){
  var service = platform.getPlatformDataService();

  style = new H.map.SpatialStyle();
  var boundariesProvider = new H.service.extension.platformData.TileProvider(service,
  {
    layerId: 'PSTLCB_GEN', level: 12
  }, {
      resultType: H.service.extension.platformData.TileProvider.ResultType.POLYLINE,
      styleCallback: function(data) {return style}
  });
  var boundaries = new H.map.layer.TileLayer(boundariesProvider);
  map.addLayer(boundaries);

  var centroidsProvider = new H.service.extension.platformData.TileProvider(service,
  {
    layerId: 'PSTLCB_MP', level: 12
  }, {
      resultType: H.service.extension.platformData.TileProvider.ResultType.MARKER
  });
  var centroids = new H.map.layer.MarkerTileLayer(centroidsProvider);
  map.addLayer(centroids);
  centroidsProvider.addEventListener('tap', function(ev) {
    var marker = ev.target;
    bubble.setPosition(marker.getGeometry());
    var str = '<nobr>Postal code: ' + marker.getData().getCell('POSTAL_CODE') + '</nobr><br>' +
              'Country code: ' + marker.getData().getCell('ISO_COUNTRY_CODE') + '<br>'
    bubble.setContent(str);
    bubble.open();
  });
}

var platform = new H.service.Platform({
  apikey: window.apikey
});

var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map, {
    pixelRatio: window.devicePixelRatio || 1
  });
window.addEventListener('resize', () => map.getViewPort().resize());

map.setCenter({lat:52.5159, lng:13.3777});
map.setZoom(13);

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

var ui = H.ui.UI.createDefault(map, defaultLayers);

bubble = new H.ui.InfoBubble(map.getCenter(), {
  content: ''
});
bubble.close();
ui.addBubble(bubble);

showPostcodes(map, bubble);
