function addDomMarker(map) {
  var outerElement = document.createElement('div'),
      innerElement = document.createElement('div');

  outerElement.style.userSelect = 'none';
  outerElement.style.webkitUserSelect = 'none';
  outerElement.style.msUserSelect = 'none';
  outerElement.style.mozUserSelect = 'none';
  outerElement.style.cursor = 'default';

  innerElement.style.color = 'red';
  innerElement.style.backgroundColor = 'blue';
  innerElement.style.border = '2px solid black';
  innerElement.style.font = 'normal 12px arial';
  innerElement.style.lineHeight = '12px'

  innerElement.style.paddingTop = '2px';
  innerElement.style.paddingLeft = '4px';
  innerElement.style.width = '20px';
  innerElement.style.height = '20px';

  innerElement.style.marginTop = '-10px';
  innerElement.style.marginLeft = '-10px';

  outerElement.appendChild(innerElement);

  innerElement.innerHTML = 'C';

  function changeOpacity(evt) {
    evt.target.style.opacity = 0.6;
  };

  function changeOpacityToOne(evt) {
    evt.target.style.opacity = 1;
  };

  var domIcon = new H.map.DomIcon(outerElement, {
    onAttach: function(clonedElement, domIcon, domMarker) {
      clonedElement.addEventListener('mouseover', changeOpacity);
      clonedElement.addEventListener('mouseout', changeOpacityToOne);
    },
    onDetach: function(clonedElement, domIcon, domMarker) {
      clonedElement.removeEventListener('mouseover', changeOpacity);
      clonedElement.removeEventListener('mouseout', changeOpacityToOne);
    }
  });

  var bearsMarker = new H.map.DomMarker({lat: 41.8625, lng: -87.6166}, {
    icon: domIcon
  });
  map.addObject(bearsMarker);
}

var platform = new H.service.Platform({
  apikey: window.apikey
});
var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map,{
  center: {lat:41.881944, lng:-87.627778},
  zoom: 11,
  pixelRatio: window.devicePixelRatio || 1
});
window.addEventListener('resize', () => map.getViewPort().resize());

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

addDomMarker(map);