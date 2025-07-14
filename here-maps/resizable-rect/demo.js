function createResizableRect(map, behavior) {
  var rect =  new H.map.Rect(
        new H.geo.Rect(51.2, 20.5, 49.5, 24.5),
        {
          style: {fillColor: 'rgba(100, 100, 100, 0.5)', lineWidth: 0}
        }
      ),
      rectOutline = new H.map.Polyline(
        rect.getGeometry().getExterior(),
        {
          style: {lineWidth: 8, strokeColor: 'rgba(255, 0, 0, 0)', fillColor: 'rgba(0, 0, 0, 0)', lineCap: 'square'}
        }
      ),
      rectGroup = new H.map.Group({
        volatility: true, 
        objects: [rect, rectOutline]
      }),
      rectTimeout;

  rect.draggable = true;
  rectOutline.draggable = true;

  rectOutline.getGeometry().pushPoint(rectOutline.getGeometry().extractPoint(0));

  map.addObject(rectGroup);

  rectGroup.addEventListener('pointerenter', function(evt) {
    var currentStyle = rectOutline.getStyle(),
        newStyle = currentStyle.getCopy({
          strokeColor: 'rgb(255, 0, 0)'
        });

    if (rectTimeout) {
      clearTimeout(rectTimeout);
      rectTimeout = null;
    }
    rectOutline.setStyle(newStyle);
  }, true);

  rectGroup.addEventListener('pointerleave', function(evt) {
    var currentStyle = rectOutline.getStyle(),
        newStyle = currentStyle.getCopy({
          strokeColor: 'rgba(255, 0, 0, 0)'
        }),
        timeout = (evt.currentPointer.type == 'touch') ? 1000 : 0;

      rectTimeout = setTimeout(function() {
        rectOutline.setStyle(newStyle);
      }, timeout);


    document.body.style.cursor = 'default';
  }, true);

  rectGroup.addEventListener('pointermove', function(evt) {
    var pointer = evt.currentPointer,
        objectTopLeftScreen = map.geoToScreen(evt.target.getGeometry().getBoundingBox().getTopLeft()),
        objectBottomRightScreen = map.geoToScreen(evt.target.getGeometry().getBoundingBox().getBottomRight()),
        draggingType = '';

    if (evt.target != rectOutline) {
      return;
    }

    if (pointer.viewportX < (objectTopLeftScreen.x + 4)) {
      document.body.style.cursor = 'ew-resize'; 
      draggingType = 'left';
    } else if (pointer.viewportX > (objectBottomRightScreen.x - 4)) {
      document.body.style.cursor = 'ew-resize'; 
      draggingType = 'right';
    } else if (pointer.viewportY < (objectTopLeftScreen.y + 4)) {
      document.body.style.cursor = 'ns-resize'; 
      draggingType = 'top';
    } else if (pointer.viewportY > (objectBottomRightScreen.y - 4)) {
      document.body.style.cursor = 'ns-resize';
      draggingType = 'bottom';
    } else {
      document.body.style.cursor = 'default'
    }

    if (draggingType == 'left') {
      if (pointer.viewportY < (objectTopLeftScreen.y + 4)) {
        document.body.style.cursor = 'nwse-resize'; 
        draggingType = 'left-top';
      } else if (pointer.viewportY > (objectBottomRightScreen.y - 4)) {
        document.body.style.cursor = 'nesw-resize'; 
        draggingType = 'left-bottom';
      }
    }  else if (draggingType == 'right') {
      if (pointer.viewportY < (objectTopLeftScreen.y + 4)) {
        document.body.style.cursor = 'nesw-resize'; 
        draggingType = 'right-top';
      } else if (pointer.viewportY > (objectBottomRightScreen.y - 4)) {
        document.body.style.cursor = 'nwse-resize'; 
        draggingType = 'right-bottom';
      }
    }

    rectGroup.setData({'draggingType': draggingType});
  }, true);

  rectGroup.addEventListener('dragstart', function(evt) {
    if (evt.target === rectOutline) {
      behavior.disable();
    }
  }, true);

  rectGroup.addEventListener('drag', function(evt) {
    var pointer = evt.currentPointer,
        pointerGeoPoint = map.screenToGeo(pointer.viewportX, pointer.viewportY);
        currentGeoRect = rect.getGeometry().getBoundingBox(),
        objectTopLeftScreen = map.geoToScreen(currentGeoRect.getTopLeft()),
        objectBottomRightScreen = map.geoToScreen(currentGeoRect.getBottomRight());

    if (evt.target instanceof H.map.Polyline) {
      var currentTopLeft = currentGeoRect.getTopLeft(),
          currentBottomRight = currentGeoRect.getBottomRight(),
          newGeoRect,
          outlineLinestring;

      switch(rectGroup.getData()['draggingType']) {
        case 'left-top':
          if (pointerGeoPoint.lng >= currentBottomRight.lng || pointerGeoPoint.lat <= currentBottomRight.lat) {
            return;
          }
          newGeoRect = H.geo.Rect.fromPoints(pointerGeoPoint, currentGeoRect.getBottomRight());
          break;
        case 'left-bottom':
          if (pointerGeoPoint.lng >= currentBottomRight.lng || pointerGeoPoint.lat >= currentTopLeft.lat) {
            return;
          }
          currentTopLeft.lng = pointerGeoPoint.lng;
          currentBottomRight.lat = pointerGeoPoint.lat;
          newGeoRect = H.geo.Rect.fromPoints(currentTopLeft, currentBottomRight);
          break;
        case 'right-top':
          if (pointerGeoPoint.lng <= currentTopLeft.lng || pointerGeoPoint.lat <= currentBottomRight.lat) {
            return;
          }
          currentTopLeft.lat = pointerGeoPoint.lat;
          currentBottomRight.lng = pointerGeoPoint.lng;
          newGeoRect = H.geo.Rect.fromPoints(currentTopLeft, currentBottomRight);
          break;
        case 'right-bottom':
          if (pointerGeoPoint.lng <= currentTopLeft.lng || pointerGeoPoint.lat >= currentTopLeft.lat) {
            return;
          }
          newGeoRect = H.geo.Rect.fromPoints(currentGeoRect.getTopLeft(), pointerGeoPoint);
          break;
        case 'left':
          if (pointerGeoPoint.lng >= currentBottomRight.lng) {
            return;
          }
          currentTopLeft.lng = pointerGeoPoint.lng;
          newGeoRect = H.geo.Rect.fromPoints(currentTopLeft, currentGeoRect.getBottomRight());
          break;
        case 'right':
          if (pointerGeoPoint.lng <= currentTopLeft.lng) {
            return;
          }
          currentBottomRight.lng = pointerGeoPoint.lng;
          newGeoRect = H.geo.Rect.fromPoints(currentGeoRect.getTopLeft(), currentBottomRight);
          break;
        case 'top':
          if (pointerGeoPoint.lat <= currentBottomRight.lat) {
            return;
          }
          currentTopLeft.lat = pointerGeoPoint.lat;
          newGeoRect = H.geo.Rect.fromPoints(currentTopLeft, currentGeoRect.getBottomRight());
          break;
        case 'bottom':
          if (pointerGeoPoint.lat >= currentTopLeft.lat) {
            return;
          }
          currentBottomRight.lat = pointerGeoPoint.lat;
          newGeoRect = H.geo.Rect.fromPoints(currentGeoRect.getTopLeft(), currentBottomRight);
          break;
      }

      rect.setBoundingBox(newGeoRect);

      outlineLinestring = rect.getGeometry().getExterior();
      outlineLinestring.pushPoint(outlineLinestring.extractPoint(0));
      rectOutline.setGeometry(outlineLinestring);

      evt.stopPropagation();
    }
  }, true);

  rectGroup.addEventListener('dragend', function(evt) {
    behavior.enable();
  }, true);
}
var platform = new H.service.Platform({
  apikey: window.apikey
});
var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map, {
  center: {lat: 50, lng: 22.8},
  zoom: 6,
  pixelRatio: window.devicePixelRatio || 1
});
window.addEventListener('resize', () => map.getViewPort().resize());

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

var ui = H.ui.UI.createDefault(map, defaultLayers, 'en-US');
createResizableRect(map, behavior);
