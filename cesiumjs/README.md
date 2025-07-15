# 🗺️ Projeto CesiumJS

---


### 1️⃣ Primeiramente voce tera que ter uma conta para obter o token de acesso ou usar o default para desemvolvimento

### 2️⃣ Crie dois arquivos html e js

### arquivo html:
```bash
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>CesiumJS Básico</title>
  <script src="https://unpkg.com/cesium@1.114.0/Build/Cesium/Cesium.js"></script>
  <link href="https://unpkg.com/cesium@1.114.0/Build/Cesium/Widgets/widgets.css" rel="stylesheet" />
  <style>
    html, body, #cesiumContainer {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      overflow: hidden;
    }
  </style>
</head>
<body>
  <div id="cesiumContainer"></div>
  <script>
    const viewer = new Cesium.Viewer('cesiumContainer');
  </script>
</body>
</html>
```
### arquivo js:
```bash
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
```
### 🚀 Rodar o projeto
```bash
npm install cesium
```
### Instale o Live Server no VSCode **ou** execute:
```bash
npm install -g http-server

http-server
```

### Exemplo:

![image](https://github.com/user-attachments/assets/495241a1-90c9-45b6-bb01-161ee09c92ff)
