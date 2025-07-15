
const yourApikey = 'SUA_APIKEY_AQUI';

const indoorMapHrn = 'hrn:here:data::org651595200:indoormap-ed6d5667-cfe0-4748-bbf5-88b00e7e3b21-collection';

const venueId = 'indoormap-00000000-0000-4000-a000-000000022766';

var infoBubble;

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

    highlightGeometries(venue, 'H&M');

    enableBubbleOnTap();
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

 function highlightGeometries (venue, geometryForSearch) {
  const searchGeometries = venue.search(geometryForSearch);
  const highlightStyle = {
    fillColor: '#FFBF00',
    outlineColor: '#99cc00',
    outlineWidth: 0.2,
  };

  if (searchGeometries.length > 0) {
    venuesProvider.activeVenue.setHighlightedGeometries(true, searchGeometries, highlightStyle);
  }
}

const onGeometryTap = (position, geometry) => {
  const popUpContent = (geometry) => `${geometry.getIdentifier()}: ${geometry.getName()} <br>`;

  if (!infoBubble) {
    infoBubble = new H.ui.InfoBubble(position, {
      onStateChange: (evt) => {
        if (evt.target.getState() === 'closed') {
          venuesProvider.getActiveVenue().setHighlightedGeometries(false, [evt.target.getData()]);
        }
      }
    });
    const domElement = document.createElement('div');
    domElement.innerHTML = popUpContent(geometry);
    domElement.setAttribute('style', 'width: max-content;');

    ui.addBubble(infoBubble);
  }

  infoBubble.setPosition(position);
  infoBubble.getContentElement().innerHTML = popUpContent(geometry)

  infoBubble.setData(geometry);

  venuesProvider.getActiveVenue().setHighlightedGeometries(true, [geometry], undefined, true);

  return geometry ? infoBubble.open() : infoBubble.close();
};
const enableBubbleOnTap = () => {
  venuesProvider.addEventListener('tap', (e) => {
    const geometry = e.target;
    if (geometry) {
      const position = map.screenToGeo(e.currentPointer.viewportX, e.currentPointer.viewportY);
      setTimeout(() => onGeometryTap(position, geometry), 0);
    }
  });
};
