Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyZTNhOGJmOS1lOTllLTQ4NzgtODE2Yy1jYTk2YWRlNGNlOWIiLCJpZCI6MzE4NjA5LCJpYXQiOjE3NTE5ODU3MDd9.d-IEQDIsudoWBGKGHk3gHyP4GgbLTqK7_74uv-mwGsM'; 

// Cria o viewer com terreno realista do Cesium
const viewer = new Cesium.Viewer('cesiumContainer', {
  terrainProvider: Cesium.createWorldTerrain(),
  shouldAnimate: true
});

// Move a câmera para São Paulo (latitude, longitude e altura)
viewer.camera.setView({
  destination: Cesium.Cartesian3.fromDegrees(-46.625290, -23.533773, 5000)
});

// Cria um ponto visual (marker) usando um Billboard (ícone)
const pinBuilder = new Cesium.PinBuilder();
const bluePin = viewer.entities.add({
  name: "São Paulo - Centro",
  position: Cesium.Cartesian3.fromDegrees(-46.625290, -23.533773),
  billboard: {
    image: pinBuilder.fromText("SP", Cesium.Color.ROYALBLUE, 48).toDataURL(),
    verticalOrigin: Cesium.VerticalOrigin.BOTTOM
  },
  description: "<h3>São Paulo</h3><p>Centro da cidade</p>"
});
