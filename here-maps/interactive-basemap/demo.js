function setInteractive(map){
  var provider = map.getBaseLayer().getProvider();

  var style = provider.getStyle();

  var changeListener = (evt) => {
    if (style.getState() === H.map.Style.State.READY) {
      style.removeEventListener('change', changeListener);

      style.setInteractive(['places', 'places.populated-places'], true);

      provider.addEventListener('tap', onTap);
    }
  };
  style.addEventListener('change', changeListener);
}

var platform = new H.service.Platform({
  apikey: window.apikey
});
var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map, {
  center: {lat: 52.51477270923461, lng: 13.39846691425174},
  zoom: 13,
  pixelRatio: window.devicePixelRatio || 1
});
window.addEventListener('resize', () => map.getViewPort().resize());

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

var ui = H.ui.UI.createDefault(map, defaultLayers);

var bubble;
function onTap(evt) {
  let position = map.screenToGeo(
    evt.currentPointer.viewportX,
    evt.currentPointer.viewportY
  );
  let props = evt.target.getData().properties;

  let content = '<div style="width:250px">It is a ' + props.kind + ' ' + (props.kind_detail || '') +
    (props.population ? '<br /> population: ' + props.population : '') +
    '<br /> local name is ' + props['name'] +
    (props['name:ar'] ? '<br /> name in Arabic is '+ props['name:ar'] : '') + '</div>';

  if (!bubble) {
    bubble = new H.ui.InfoBubble(position, {
      content: content
    });
    ui.addBubble(bubble);
  } else {
    bubble.setPosition(position);
    bubble.setContent(content);
    bubble.open();
  }
}

setInteractive(map);