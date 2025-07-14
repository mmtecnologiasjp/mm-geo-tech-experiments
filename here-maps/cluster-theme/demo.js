function startClustering(map, ui, getBubbleContent, data) {

  var dataPoints = data.map(function (item) {

    return new H.clustering.DataPoint(item.latitude, item.longitude, null, item);
  });


  var clusteredDataProvider = new H.clustering.Provider(dataPoints, {
    clusteringOptions: {

      eps: 64,

      minWeight: 3
    },
    theme: CUSTOM_THEME
  });

  clusteredDataProvider.addEventListener('tap', onMarkerClick);


  var layer = new H.map.layer.ObjectLayer(clusteredDataProvider);


  map.addLayer(layer);
}


var CUSTOM_THEME = {
  getClusterPresentation: function (cluster) {

    var randomDataPoint = getRandomDataPoint(cluster),

      data = randomDataPoint.getData();


    var clusterMarker = new H.map.Marker(cluster.getPosition(), {
      icon: new H.map.Icon(data.thumbnail, {
        size: { w: 50, h: 50 },
        anchor: { x: 25, y: 25 }
      }),


      min: cluster.getMinZoom(),
      max: cluster.getMaxZoom()
    });


    clusterMarker.setData(data);

    return clusterMarker;
  },
  getNoisePresentation: function (noisePoint) {

    var data = noisePoint.getData(),

      noiseMarker = new H.map.Marker(noisePoint.getPosition(), {

        min: noisePoint.getMinZoom(),
        icon: new H.map.Icon(data.thumbnail, {
          size: { w: 20, h: 20 },
          anchor: { x: 10, y: 10 }
        })
      });


    noiseMarker.setData(data);

    return noiseMarker;
  }
};



function getRandomDataPoint(cluster) {
  var dataPoints = [];


  cluster.forEachDataPoint(dataPoints.push.bind(dataPoints));


  return dataPoints[Math.random() * dataPoints.length | 0];
}


function onMarkerClick(e) {

  var position = e.target.getGeometry(),

    data = e.target.getData(),

    bubbleContent = getBubbleContent(data),
    bubble = onMarkerClick.bubble;


  if (!bubble) {
    bubble = new H.ui.InfoBubble(position, {
      content: bubbleContent
    });
    ui.addBubble(bubble);

    onMarkerClick.bubble = bubble;
  } else {

    bubble.setPosition(position);
    bubble.setContent(bubbleContent);
    bubble.open();
  }

  map.setCenter(position, true);
}


var platform = new H.service.Platform({
  apikey: window.apikey
});
var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(document.getElementById('map'), defaultLayers.vector.normal.map, {
  center: new H.geo.Point(50.426467222414374, 6.3054632497803595),
  zoom: 6,
  pixelRatio: window.devicePixelRatio || 1
});

window.addEventListener('resize', () => map.getViewPort().resize());


var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));


var ui = H.ui.UI.createDefault(map, defaultLayers);


function getBubbleContent(data) {
  return [
    '<div class="bubble">',
    '<a class="bubble-image" ',
    'style="background-image: url(', data.fullurl, ')" ',
    'href="', data.url, '" target="_blank">',
    '</a>',
    '<span>',

    data.author ? ['Photo by: ', '<a href="//commons.wikimedia.org/wiki/User:',
      encodeURIComponent(data.author), '" target="_blank">',
      data.author, '</a>'].join('') : '',
    '<hr/>',
    '<a class="bubble-footer" href="//commons.wikimedia.org/" target="_blank">',
    '<img class="bubble-logo" src="data/wikimedia-logo.png" width="20" height="20" />',
    '<span class="bubble-desc">',
    'Photos provided by Wikimedia Commons are <br/>under the copyright of their owners.',
    '</span>',
    '</a>',
    '</span>',
    '</div>'
  ].join('');
}


startClustering(map, ui, getBubbleContent, photos);
