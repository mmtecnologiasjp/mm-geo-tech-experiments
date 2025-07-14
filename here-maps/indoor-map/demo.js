const yourApikey = 'SUA_APIKEY_AQUI';

const indoorMapHrn = 'hrn:here:data::org651595200:indoormap-ed6d5667-cfe0-4748-bbf5-88b00e7e3b21-collection';

const venueId = 'indoormap-00000000-0000-4000-a000-000000007348';

const drawingId = 'structure-7880';

const showBaseMap = true;

const levelIndex = 1;

const labelTextPreferenceOverride = [
  H.venues.Service2.LABEL_TEXT_PREFERENCE_OVERRIDE.OCCUPANT_NAMES,
  H.venues.Service2.LABEL_TEXT_PREFERENCE_OVERRIDE.SPACE_NAME
]

function addVenueToMap(map, platform) {
  const venuesProvider = new H.venues.Provider();
  const venuesService = platform.getVenuesService({ apikey: yourApikey, hrn: indoorMapHrn }, 2);

  venuesService.getMapInfoList().then(mapInfoList => {
    mapInfoList.forEach(mapInfo => {
      console.log("Indoor map id: " + mapInfo.mapId + ", map name: " + mapInfo.mapName);
    });
  });

  venuesService.loadVenue(venueId, { labelTextPreferenceOverride }).then((venue) => {
    venuesProvider.addVenue(venue);
    venuesProvider.setActiveVenue(venue);
    const venueLayer = new H.map.layer.TileLayer(venuesProvider);
    if (showBaseMap) {
      map.addLayer(venueLayer);
    } else {
      map.setBaseLayer(venueLayer);
    }

    map.setCenter(venue.getCenter());

    if (venue.getDrawing(drawingId)) {
      venue.setActiveDrawing(drawingId);
    }

    if (venue.getLevels().length >= levelIndex) {
      venue.setActiveLevelIndex(levelIndex);
    }

    const levelControl = new H.venues.ui.LevelControl(venue);
    ui.addControl('level-control', levelControl);

    const drawingControl = new H.venues.ui.DrawingControl(venue);
    ui.addControl('drawing-control', drawingControl);
  });
}

var platform = new H.service.Platform({
  apikey: yourApikey
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

addVenueToMap(map, platform);
