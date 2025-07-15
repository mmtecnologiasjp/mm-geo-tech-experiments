
const yourApikey = 'SUA_APIKEY_AQUI';

const indoorMapHrn = 'hrn:here:data::org651595200:indoormap-ed6d5667-cfe0-4748-bbf5-88b00e7e3b21-collection';

const venueId = 'indoormap-00000000-0000-4000-a000-000000027158';
function addVenueToMap(map) {
  const venuesService = platform.getVenuesService({ apikey: yourApikey, hrn: indoorMapHrn }, 2);

  venuesService.loadVenue(venueId).then((venue) => {
    venuesProvider.addVenue(venue);
    venuesProvider.setActiveVenue(venue);

    const venueLayer = new H.map.layer.TileLayer(venuesProvider);
    map.addLayer(venueLayer);

    map.setCenter(venue.getCenter());

    const levelControl = new H.venues.ui.LevelControl(venue);
    ui.addControl('level-control', levelControl);

    const drawingControl = new H.venues.ui.DrawingControl(venue);
    ui.addControl('drawing-control', drawingControl);

    restrictMap(map, venue);

    rotateMap(map, 90);
  });
}

var platform = new H.service.Platform({
  apikey: window.apikey
});
var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(document.getElementById('map'), defaultLayers.vector.normal.map, {
  zoom: 18,
  center: { lat: 47.452353, lng: 8.562455 },
  pixelRatio: window.devicePixelRatio || 1
});

window.addEventListener('resize', () => map.getViewPort().resize());

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

var ui = H.ui.UI.createDefault(map, defaultLayers);

const venuesProvider = new H.venues.Provider();

addVenueToMap(map);

function rotateMap(map, angle) {
  map.getViewModel().setLookAtData({ 
    tilt: 0,
    heading: angle
  });
}

 function restrictMap(map, venue) {

  var bounds = venue.getBoundingBox(); 

  map.getViewModel().addEventListener('sync', function() {
    var center = map.getCenter();

    if (!bounds.containsPoint(center)) {
      if (center.lat > bounds.getTop()) {
        center.lat = bounds.getTop();
      } else if (center.lat < bounds.getBottom()) {
        center.lat = bounds.getBottom();
      }
      if (center.lng < bounds.getLeft()) {
        center.lng = bounds.getLeft();
      } else if (center.lng > bounds.getRight()) {
        center.lng = bounds.getRight();
      }
      map.setCenter(center);
    }
  });

  map.addObject(new H.map.Rect(bounds, {
    style: {
        fillColor: 'rgba(55, 85, 170, 0.1)',
        strokeColor: 'rgba(55, 85, 170, 0.3)',
        lineWidth: 2
      }
    }
  ));
}