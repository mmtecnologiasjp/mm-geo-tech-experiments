# 🗺️ Projeto Overpass-Turbo

---
1️⃣ Primeiramente Crie um arquivo html e adicione a api disponibilizada pelo Overpass-Turbo
```bash
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Overpass Turbo + Leaflet</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
  />

  <style>
    body { margin: 0; font-family: Arial, sans-serif; }
    #map { height: 500px; width: 100%; }
    button { padding: 10px; margin: 10px; font-size: 16px; cursor: pointer; }
    pre { background: #f0f0f0; padding: 10px; max-height: 300px; overflow: auto; }
    h2 { text-align: center; margin-top: 10px; }
  </style>
</head>
<body>

  <h2>Consulta Overpass + Leaflet (Restaurantes em Curitiba)</h2>
  <div id="map"></div>
  <button onclick="buscarRestaurantes()">Buscar Restaurantes</button>
  <pre id="saida">Clique no botão acima para ver os dados retornados...</pre>

  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

  <script>
    // Inicializa o mapa centrado em Curitiba
    const mapa = L.map('map').setView([-25.43, -49.27], 13);


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mapa);

    let marcadores = [];

    async function buscarRestaurantes() {
      const bbox = [-25.49, -49.32, -25.37, -49.20]; // Curitiba
      const query = `
        [out:json][timeout:25];
        (
          node["amenity"="restaurant"](${bbox.join(',')});
          way["amenity"="restaurant"](${bbox.join(',')});
          relation["amenity"="restaurant"](${bbox.join(',')});
        );
        out body;
        >;
        out skel qt;
      `;

      const saida = document.getElementById("saida");

      try {
        const response = await fetch("https://overpass-api.de/api/interpreter", {
          method: "POST",
          body: query,
        });

        const data = await response.json();

        saida.textContent = JSON.stringify(data, null, 2);


        marcadores.forEach(m => mapa.removeLayer(m));
        marcadores = [];


        data.elements.forEach(e => {
          if (e.type === "node" && e.lat && e.lon) {
            const nome = e.tags?.name || "Restaurante";
            const marker = L.marker([e.lat, e.lon])
              .addTo(mapa)
              .bindPopup(`<b>${nome}</b><br>ID: ${e.id}`);
            marcadores.push(marker);
          }
        });

        alert(`${marcadores.length} restaurantes encontrados!`);

      } catch (error) {
        console.error("Erro:", error);
        saida.textContent = "Erro ao buscar dados da Overpass API.";
      }
    }
  </script>

</body>
</html>
```
### 🚀 Rodar o projeto

### Utilize o Live-Server ou:

```bash
npx serve .
```
# Exemplo:

![image](https://github.com/user-attachments/assets/0ffe97ea-2f54-43f8-bfb8-65cf33d6633b)
