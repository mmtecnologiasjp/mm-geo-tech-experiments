
function rotateDomMarker() {
  var domIconElement = document.createElement('div'),
      interval,
      counter = 0;

  domIconElement.style.margin = '-20px 0 0 -20px';

  domIconElement.innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40">
      <path d="m0.812665,23.806608l37.937001,-22.931615l-21.749812,38.749665l1.374988,-17.749847l-17.562177,1.931797z"
        fill-opacity="null" stroke-opacity="null" stroke-width="1.5" stroke="#000" fill="#fff"/>
    </svg>`;
  marker = map.addObject(new H.map.DomMarker({lat: 50.90978, lng: 10.87203}, {
    icon: new H.map.DomIcon(domIconElement, {
      onAttach: function(clonedElement, domIcon, domMarker) {
        var clonedContent = clonedElement.getElementsByTagName('svg')[0];

        clonedContent.style.transform = 'rotate(' + counter + 'deg)';

        interval = setInterval(function() {
          clonedContent.style.transform = 'rotate(' + (counter += 45) + 'deg)';
        }, 1000)
      },
      onDetach: function(clonedElement, domIcon, domMarker) {
        clearInterval(interval);
      }
    })
  }));
}

var mapContainer = document.getElementById('map'),
  routeInstructionsContainer = document.getElementById('panel');

var platform = new H.service.Platform({
  apikey: window.apikey
});

var defaultLayers = platform.createDefaultLayers();
var map = new H.Map(mapContainer,
  defaultLayers.vector.normal.map,{
  center: {lat: 50.90978, lng: 10.87203},
  zoom: 6,
  pixelRatio: (window.devicePixelRatio && window.devicePixelRatio > 1) ? 2 : 1
});
window.addEventListener('resize', function () {
  map.getViewPort().resize();
});
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

var ui = H.ui.UI.createDefault(map, defaultLayers);

rotateDomMarker();
