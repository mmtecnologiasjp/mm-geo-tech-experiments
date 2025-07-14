function addShapesToMap(map) {
  var circle = new H.map.Circle(
    { lat: 48.87259349768352, lng: 2.335760881796987 }, 2, {
    extrude: 40,
    style: {
      fillColor: '#0297A0', strokeColor: 'none'
    }
  })
  var polygon = new H.map.Polygon(new H.geo.Polygon(
    new H.geo.LineString([
      48.872736787725835, 2.3357521086738733, 0,
      48.872999137012414, 2.336246110725605, 0,
      48.873206469632656, 2.335367301542851, 0,
      48.8730321868559, 2.33536897595885, 0,
      48.87279198168118, 2.3354461066058567, 0
    ]), [
    new H.geo.LineString([
      48.87289262905369, 2.3355164652820624, 0,
      48.87293843005124, 2.3356328576727807, 0,
      48.872856799273066, 2.3357070736759376, 0,
      48.87280671673371, 2.3355991272331043, 0
    ])
  ]
  ), {
    extrude: 90,
    style: { strokeColor: 'none' }
  });

  map.addObjects([polygon, circle]);
}
var platform = new H.service.Platform({
  apikey: window.apikey
});
var defaultLayers = platform.createDefaultLayers();
var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map, {
  center: { lat: 48.872896005495306, lng: 2.3360622646724236 },
  zoom: 18.5,
  pixelRatio: window.devicePixelRatio || 1
});
map.getViewModel().setLookAtData({ tilt: 38, heading: 245 });
window.addEventListener('resize', () => map.getViewPort().resize());

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

addShapesToMap(map);