mapboxgl.accessToken = 'pk.eyJ1Ijoic3pwYWsiLCJhIjoiY21jcDZlNWFmMDMyOTJub2htNzFpY2U3cCJ9.cv0VvtWlhFKP7oZ_aHXwxA';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-46.625290, -23.533773], 
  zoom: 12
});

const marker = new mapboxgl.Marker()
  .setLngLat([-46.625290, -23.533773])
  .setPopup(new mapboxgl.Popup().setHTML("<h3>São Paulo</h3><p>Centro</p>"))
  .addTo(map);
