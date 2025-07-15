function calculateRouteFromAtoB (platform) {
  var router = platform.getPublicTransitService(),
      routeRequestParams = {
        origin: '52.5208,13.4093', // Fernsehturm
        destination: '52.5034,13.3280',  // Kurfürstendamm
        return: 'polyline,actions,travelSummary'
      };


  router.getRoutes(
    routeRequestParams,
    onSuccess,
    onError
  );
}
function onSuccess(result) {
  var route = result.routes[0];

  addRouteShapeToMap(route);
  addManueversToMap(route);
  addManueversToPanel(route);
  addSummaryToPanel(route);
}

function onError(error) {
  alert('Can\'t reach the remote server');
}

var mapContainer = document.getElementById('map'),
  routeInstructionsContainer = document.getElementById('panel');

var platform = new H.service.Platform({
  apikey: window.apikey
});
var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(mapContainer,
  defaultLayers.vector.normal.map,{
  center: {lat:52.5160, lng:13.3779},
  zoom: 13,
  pixelRatio: window.devicePixelRatio || 1
});
window.addEventListener('resize', () => map.getViewPort().resize());

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

var ui = H.ui.UI.createDefault(map, defaultLayers);

var bubble;

function openBubble(position, text){
 if(!bubble){
    bubble =  new H.ui.InfoBubble(
      position,
      {content: text});
    ui.addBubble(bubble);
  } else {
    bubble.setPosition(position);
    bubble.setContent(text);
    bubble.open();
  }
}


function addRouteShapeToMap(route){
  var group = new H.map.Group();

  route.sections.forEach(function(section) {
    group.addObject(
      new H.map.Polyline(
        H.geo.LineString.fromFlexiblePolyline(section.polyline), {
          style: {
            lineWidth: 4,
            strokeColor: 'rgba(0, 128, 255, 0.7)'
          }
        }
      )
    );
  });
  map.addObject(group);
  map.getViewModel().setLookAtData({
    bounds: group.getBoundingBox()
  });
}

function addManueversToMap(route){
  var svgMarkup = '<svg width="18" height="18" ' +
    'xmlns="http://www.w3.org/2000/svg">' +
    '<circle cx="8" cy="8" r="8" ' +
      'fill="#1b468d" stroke="white" stroke-width="1"  />' +
    '</svg>',
    dotIcon = new H.map.Icon(svgMarkup, {anchor: {x:8, y:8}}),
    group = new  H.map.Group(),
    i;

    route.sections.forEach((section) => {
      let poly = H.geo.LineString.fromFlexiblePolyline(section.polyline).getLatLngAltArray();

      let actions = section.actions;
      if (actions) {
        for (i = 0;  i < actions.length; i += 1) {
          let action = actions[i];
          var marker =  new H.map.Marker({
            lat: poly[action.offset * 3],
            lng: poly[action.offset * 3 + 1]},
            {icon: dotIcon});
          marker.instruction = action.instruction;
          group.addObject(marker);
        }
      }
    });

    group.addEventListener('tap', function (evt) {
      map.setCenter(evt.target.getGeometry());
      openBubble(
        evt.target.getGeometry(), evt.target.instruction);
    }, false);

    map.addObject(group);
}

function addSummaryToPanel(route){
  let duration = 0,
      distance = 0;

  route.sections.forEach((section) => {
    distance += section.travelSummary.length;
    duration += section.travelSummary.duration;
  });

  var summaryDiv = document.createElement('div'),
   content = '';
   content += '<b>Total distance</b>: ' + distance  + 'm. <br/>';
   content += '<b>Travel Time</b>: ' + duration.toMMSS();


  summaryDiv.style.fontSize = 'small';
  summaryDiv.style.marginLeft ='5%';
  summaryDiv.style.marginRight ='5%';
  summaryDiv.innerHTML = content;
  routeInstructionsContainer.appendChild(summaryDiv);
}

function addManueversToPanel(route){
  var nodeOL = document.createElement('ol');

  nodeOL.style.fontSize = 'small';
  nodeOL.style.marginLeft ='5%';
  nodeOL.style.marginRight ='5%';
  nodeOL.className = 'directions';

  route.sections.forEach((section) => {
    if (section.actions) {
      section.actions.forEach((action, idx) => {
        var li = document.createElement('li'),
            spanArrow = document.createElement('span'),
            spanInstruction = document.createElement('span');

        spanArrow.className = 'arrow ' + (action.direction || '') + action.action;
        spanInstruction.innerHTML = section.actions[idx].instruction;
        li.appendChild(spanArrow);
        li.appendChild(spanInstruction);

        nodeOL.appendChild(li);
      });
    }
  });

  routeInstructionsContainer.appendChild(nodeOL);
}


Number.prototype.toMMSS = function () {
  return  Math.floor(this / 60)  +' minutes '+ (this % 60)  + ' seconds.';
}

calculateRouteFromAtoB (platform);
