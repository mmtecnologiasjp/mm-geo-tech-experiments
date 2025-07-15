mapboxgl.accessToken = 'pk.eyJ1Ijoic3pwYWsiLCJhIjoiY21jcDZlNWFmMDMyOTJub2htNzFpY2U3cCJ9.cv0VvtWlhFKP7oZ_aHXwxA';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  center: [-46.625290, -23.533773],
  zoom: 13
});

new mapboxgl.Marker().setLngLat([-46.625290, -23.533773]).addTo(map);
