function overlayHistoricalBerlin(map) {
  var tileProvider = new H.map.provider.ImageTileProvider({
    min: 12,
    max: 15,
    opacity: 0.5,
    getURL: function (column, row, zoom) {
      if (((zoom == 12) && (row != 1343 || column != 2200)) ||
        ((zoom == 13) &&  (row < 2686 || column < 4400 || row > 2687 || column > 4401)) ||
        ((zoom == 14) && (row < 5372 || column < 8800 || row > 5375 || column > 8803)) ||
        ((zoom  == 15) && (row < 10744 || column < 17601 || row > 10750 || column > 17607))) {
        return 'https://heremaps.github.io/maps-api-for-javascript-examples/custom-tile-overlay/tiles/blank.png';
      } else {
        return 'https://heremaps.github.io/maps-api-for-javascript-examples/custom-tile-overlay/tiles/'+ zoom+ '/'+ row + '/'+ column+ '.png';
      }
    }
  });
  tileProvider.getCopyrights = function (bounds, level) {
    return [{
      label: "Overlay derived from <a href='http://commons.wikimedia.org/wiki/File%3AMap_de_berlin_1789_%28georeferenced%29.jpg' target='_blank'>WikiMedia Commons</a>",
      alt: 'Overlay Based on a WikiMedia Commons Image in the Public Domain'
    }];
  };
  var overlayLayer = new H.map.layer.TileLayer(tileProvider, {
    opacity: 0.5
  });

  map.addLayer(overlayLayer);
}
var platform = new H.service.Platform({
  apikey: window.apikey
});
var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(document.getElementById('map'), defaultLayers.vector.normal.map, {
  center: new H.geo.Point(52.515, 13.405),
  zoom: 14,
  pixelRatio: window.devicePixelRatio || 1
});
window.addEventListener('resize', () => map.getViewPort().resize());

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

var ui = H.ui.UI.createDefault(map, defaultLayers);

overlayHistoricalBerlin(map);
