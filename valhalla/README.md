# 🗺️ Projeto Valhalla

### 1️⃣  Crie um arquivo index.html para o projeto
```bash
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Valhalla + Leaflet</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <style>
    body { margin: 0; }
    #map { height: 90vh; }
    #info {
      background: #f5f5f5;
      padding: 10px;
      font-family: sans-serif;
    }
  </style>
</head>
<body>

<div id="info">Clique em dois pontos para traçar a rota.</div>
<div id="map"></div>

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<script>
  const map = L.map('map').setView([-25.4296, -49.2712], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

  let points = [];
  let markers = [];
  let routeLayer;

  function decodePolyline(str, precision = 6) {
    let index = 0, lat = 0, lng = 0, coordinates = [], shift = 0, result = 0, byte = null;
    const factor = Math.pow(10, precision);

    while (index < str.length) {
      byte = null;
      shift = 0;
      result = 0;
      do {
        byte = str.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
      const deltaLat = (result & 1) ? ~(result >> 1) : (result >> 1);
      lat += deltaLat;

      shift = result = 0;
      do {
        byte = str.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
      const deltaLng = (result & 1) ? ~(result >> 1) : (result >> 1);
      lng += deltaLng;

      coordinates.push([lat / factor, lng / factor]);
    }
    return coordinates;
  }

  map.on('click', (e) => {
    if (points.length >= 2) {
      points = [];
      markers.forEach(m => m.remove());
      markers = [];
      if (routeLayer) routeLayer.remove();
      document.getElementById('info').innerText = 'Clique em dois pontos para traçar a rota.';
    }

    points.push([e.latlng.lat, e.latlng.lng]);
    const marker = L.marker(e.latlng).addTo(map);
    markers.push(marker);

    if (points.length === 2) {
      getRoute(points[0], points[1]);
    }
  });

  async function getRoute(p1, p2) {
    const body = {
      locations: [
        { lat: p1[0], lon: p1[1] },
        { lat: p2[0], lon: p2[1] }
      ],
      costing: "auto",
      directions_options: { units: "km" }
    };

    try {
      const res = await fetch("https://valhalla1.openstreetmap.de/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (!data.trip) {
        alert("Erro ao calcular rota.");
        return;
      }

      const shape = data.trip.legs[0].shape;
      const coords = decodePolyline(shape);

      routeLayer = L.polyline(coords, { color: 'blue', weight: 5 }).addTo(map);

      const dist = data.trip.summary.length;
      const time = (data.trip.summary.time / 60).toFixed(1);
      document.getElementById('info').innerText = `Distância: ${dist.toFixed(2)} km | Tempo estimado: ${time} min`;

    } catch (err) {
      console.error("Erro na requisição:", err);
      alert("Erro na requisição. Verifique a conexão.");
    }
  }
</script>

</body>
</html>
```
### 🚀 Rodar o projeto

Uitlize o Live-Server

### Exemplo

<img width="1459" height="803" alt="image" src="https://github.com/user-attachments/assets/afe0415d-e462-44d2-825f-d6105a558d38" />
