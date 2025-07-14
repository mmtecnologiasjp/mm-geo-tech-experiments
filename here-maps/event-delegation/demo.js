
function testDelegation(map) {
  var brandenburgerTorMarker = new H.map.Marker(new H.geo.Point(52.516237, 13.377686));

  var fernsehturmMarker = new H.map.Marker(new H.geo.Point(52.520816, 13.409417));

  var circle = new H.map.Circle(
    new H.geo.Point(52.5194, 13.3986),
    250,
    {
      style: {
        fillColor: 'rgba(0, 221, 255, 0.66)',
      }
    }
  );
  var polygon = new H.map.Polygon(new H.geo.LineString([
    52.51998, 13.40529, 0,
    52.52395, 13.41250, 0,
    52.52197, 13.41590, 0,
    52.51860, 13.40718, 0
  ]), {
    style: {
      lineWidth: 1,
      strokeColor: 'rgba(204, 34, 34, 0.66)',
      fillColor: 'rgba(204, 34, 34, 0.66)',
    }
  });

  var polyline = new H.map.Polyline(new H.geo.LineString([
    52.521490, 13.387983, 0,
    52.517156, 13.388820, 0,
    52.516960, 13.385730, 0,
    52.515510, 13.386009, 0,
    52.515132, 13.381481, 0,
    52.516333, 13.380806, 0
  ]), {
    style: {
      strokeColor: 'rgba(34, 34, 204, 0.66)',
      lineWidth: 7
    }
  });

  brandenburgerTorMarker.setData('I am Brandenburger Tor!');
  fernsehturmMarker.setData('I am Fernsehturm');
  circle.setData('I am Circle!');
  polygon.setData('I am Polygon!');
  polyline.setData('I am Polyline!');

  var container = new H.map.Group({
    objects: [brandenburgerTorMarker, fernsehturmMarker, circle, polygon, polyline]
  });

  container.addEventListener('tap', function (evt) {

    customLog(evt.target.getData());
  });

  map.getViewModel().setLookAtData({
    bounds: container.getBoundingBox()
  });

  map.addObject(container);
}

var platform = new H.service.Platform({
  apikey: window.apikey
});
var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(document.getElementById('map'), defaultLayers.vector.normal.map, {

  center: new H.geo.Point(52.51, 13.4),
  zoom: 10,
  pixelRatio: window.devicePixelRatio || 1
});

window.addEventListener('resize', () => map.getViewPort().resize());

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

var ui = H.ui.UI.createDefault(map, defaultLayers, 'en-US');

var logContainer = document.createElement('ul');
logContainer.className = 'log';
logContainer.innerHTML = '<li class="log-entry">Try clicking on elements</li>';
map.getElement().appendChild(logContainer);
function customLog(log) {
  var entry = document.createElement('li');
  entry.className = 'log-entry';
  entry.textContent = log;
  logContainer.insertBefore(entry, logContainer.firstChild);
}

testDelegation(map, customLog);