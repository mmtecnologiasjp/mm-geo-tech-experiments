# 🗺️ Projeto Leaflet.js com Vite

---

### 1️⃣  Crie uma pasta para o projeto
```bash
mkdir leafletjs
cd leafletjs
```

### 2️⃣ Inicialize o projeto com npm
```bash
-npm init -y
```

### 3️⃣ Instale as dependências
```bash
-npm install vite --save-dev
```

### Instale o Leaflet:
```bash
-npm install leaflet
```

### 4️⃣ Crie o arquivo index.html
```bash
<!DOCTYPE html>
<html>
<head>
  <title>Leaflet Test</title>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link rel="stylesheet" href="node_modules/leaflet/dist/leaflet.css" />
  
  <style>
    #map { height: 100vh; }
    body, html { margin: 0; padding: 0; }
  </style>
</head>
<body>

<div id="map"></div>

<script src="node_modules/leaflet/dist/leaflet.js"></script>

<script>
  const map = L.map('map').setView([-23.5505, -46.6333], 13);

  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {  // aqui podera mudar  o estilo do mapa
    attribution: '&copy; CartoDB',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

  L.marker([-23.5505, -46.6333]).addTo(map)
    .bindPopup('São Paulo')
    .openPopup();
</script>

</body>
</html>
```

---

### 🚀 Rode o index.html com o Live-Server


### Estilos de mapas

🗺️ Padrão (OSM)    OpenStreetMap
![image](https://github.com/user-attachments/assets/bcff3c9a-85f8-49a5-86de-75767978d8ad)

Satélite    Esri, Mapbox, Google (via plugin)
![image](https://github.com/user-attachments/assets/77c25d7a-0716-474f-8c11-254f0c777735)

Dark    CartoDB Dark Matter, Mapbox Dark
![image](https://github.com/user-attachments/assets/63adaf5a-875d-4396-916e-bce0b775c31c)

Light / Minimalista    CartoDB Positron, Stamen Toner Lite
![image](https://github.com/user-attachments/assets/88abbd6c-2b6b-454c-99f7-4152d8b261b8)

