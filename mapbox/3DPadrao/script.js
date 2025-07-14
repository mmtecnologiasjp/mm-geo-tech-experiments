mapboxgl.accessToken = 'pk.eyJ1Ijoic3pwYWsiLCJhIjoiY21jcDZlNWFmMDMyOTJub2htNzFpY2U3cCJ9.cv0VvtWlhFKP7oZ_aHXwxA';

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