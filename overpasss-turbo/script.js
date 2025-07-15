const mapa = L.map('map').setView([-25.43, -49.27], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(mapa);

let marcadores = [];

async function buscarRestaurantes() {
    const bbox = [-25.49, -49.32, -25.37, -49.20]; 
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