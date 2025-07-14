# 🗺️ Projeto Mapbox

---

### 1️⃣ Primeiramente é necessario criar uma conta no site da mapbox para adquirir sua Key

### 2️⃣ Criar dois arquivos html e js, como no exemplo para o mapa 3D abaixo:

### para o index  utilizar:
```bash
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Mapbox GL JS 3D</title>
  <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
  <link href="https://cdn.jsdelivr.net/npm/mapbox-gl@2.15.0/dist/mapbox-gl.css" rel="stylesheet" /> // base para o mapa 
  <style>
    body { margin:0; padding:0; }                              #// estilo do mapa 
    #map { position:absolute; top:0; bottom:0; width:100%; }   // estilo do mapa
  </style>
</head>
<body>
  <div id="map"></div>
  <script src="https://cdn.jsdelivr.net/npm/mapbox-gl@2.15.0/dist/mapbox-gl.js"></script>
  <script src="./script.js"></script>
</body>
</html>

```
### para o js utilizar  o token:
```bash
mapboxgl.accessToken = 'pk.eyJ1Ijoic3pwYWsiLCJhIjoiY21jcDZlNWFmMDMyOTJub2htNzFpY2U3cCJ9.cv0VvtWlhFKP7oZ_aHXwxA'; #// sua key aqui | exemplo do mapa 3D

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-46.625290, -23.533773],
      zoom: 15,
      pitch: 60,    // inclinação para 3D
      bearing: -17.6,  // rotação do mapa
      antialias: true
    });

    map.on('load', () => {
      // Adiciona camada de edifícios 3D
      const layers = map.getStyle().layers;
      let labelLayerId;
      for (let i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
          labelLayerId = layers[i].id;
          break;
        }
      }

      map.addLayer(
        {
          'id': '3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 15,
          'paint': {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-base': ['get', 'min_height'],
            'fill-extrusion-opacity': 0.6
          }
        },
        labelLayerId
      );
    });
```


### 🚀 Rodar a ferramenta

### Para baixar o mapbox e suas dependencia:

```bash 
npm install mapbox-gl@2.15.0
```

### Para abrir o server local utilizar o Live-Server ou:
```bash
npx serve .
```
### Exemplo:

![image](https://github.com/user-attachments/assets/7b4a551d-652c-4771-985f-ba2dfb4b4940)

