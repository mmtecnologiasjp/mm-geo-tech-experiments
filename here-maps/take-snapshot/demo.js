function capture(resultContainer, map, ui) {
    map.capture(
      function (canvas) {
        if (canvas) {
          resultContainer.innerHTML = "";
          resultContainer.appendChild(canvas);
        } else {
          resultContainer.innerHTML = "Capturing is not supported";
        }
      },
      [ui],
      50,
      50,
      500,
      200
    );
  }
  var platform = new H.service.Platform({
    apikey: `SUA_APIKEY_AQUI`,
  });
  var defaultLayers = platform.createDefaultLayers();
  
  var mapContainer = document.getElementById("map");
  
  var map = new H.Map(mapContainer, defaultLayers.vector.normal.map, {
    zoom: 16,
    center: { lat: 48.869145, lng: 2.314298 },
    pixelRatio: window.devicePixelRatio || 1,
  });
  window.addEventListener("resize", () => map.getViewPort().resize());
  
  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  
  var ui = H.ui.UI.createDefault(map, defaultLayers, "pt-BR");
  
  var resultContainer = document.getElementById("panel");
  
  var containerNode = document.createElement("div");
  containerNode.className = "btn-group";
  
  var captureBtn = document.createElement("input");
  captureBtn.value = "Capture";
  captureBtn.type = "button";
  captureBtn.className = "btn btn-sm btn-default";
  
  containerNode.appendChild(captureBtn);
  mapContainer.appendChild(containerNode);
  
  captureBtn.onclick = function () {
    capture(resultContainer, map, ui);
  };
  