function renderKML(map) {
  reader = new H.data.kml.Reader('https://heremaps.github.io/maps-api-for-javascript-examples/display-kml-on-map/data/us-states.kml');
  reader.addEventListener("statechange", function(evt){
    if (evt.state === H.data.AbstractReader.State.READY) {
      map.addLayer(reader.getLayer());
      reader.getLayer().getProvider().addEventListener("tap", (evt) => {
        logEvent(evt.target.getData().name)
      });
    }
    if (evt.state === H.data.AbstractReader.State.ERROR) {
      logEvent('KML parsing error')
    }
  });

  reader.parse();
}

var platform = new H.service.Platform({
  apikey: window.apikey
});
var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(document.getElementById('map'), defaultLayers.vector.normal.map, {
  zoom: 2.5,
  center: {lat: 48.30432303555956, lng: -104.94466241321628},
  pixelRatio: window.devicePixelRatio || 1
});
window.addEventListener('resize', () => map.getViewPort().resize());

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

var ui = H.ui.UI.createDefault(map, defaultLayers);

var logContainer = document.createElement('ul');
logContainer.className ='log';
logContainer.innerHTML = '<li class="log-entry">Try clicking on the map</li>';
map.getElement().appendChild(logContainer);

function logEvent(str) {
  var entry = document.createElement('li');
  entry.className = 'log-entry';
  entry.textContent = str;
  logContainer.insertBefore(entry, logContainer.firstChild);
}

renderKML(map);