# 🗺️ Projeto AnyMap-AnyChart

---

### 1️⃣ Criar um arquivo html

adicionar ao html:

```bash
<!doctype html>
<html lang="en">
 <head>
  <meta charset="UTF-8">
  <meta content="IE=edge" http-equiv="X-UA-Compatible">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <title>Geo Map</title>
  <link href="https://playground.anychart.com/templates/geo_map/iframe" rel="canonical">
  <meta content="Choropleth Map,Geo Chart" name="keywords">
  <meta content="AnyChart - JavaScript Charts designed to be embedded and integrated" name="description">
  <!--[if lt IE 9]>
<script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->
  <link href="https://cdn.anychart.com/releases/v8/css/anychart-ui.min.css" rel="stylesheet" type="text/css">
  <link href="https://cdn.anychart.com/releases/v8/fonts/css/anychart-font.css" rel="stylesheet" type="text/css">
  <style>html, body, #container {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}</style>
 </head>
 <body>
  <div id="container"></div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.3.15/proj4.js"></script>
  <script src="https://cdn.anychart.com/releases/v8/js/anychart-base.min.js"></script>
  <script src="https://cdn.anychart.com/releases/v8/js/anychart-ui.min.js"></script>
  <script src="https://cdn.anychart.com/releases/v8/js/anychart-exports.min.js"></script>
  <script src="https://cdn.anychart.com/releases/v8/js/anychart-map.min.js"></script>
  <script src="https://cdn.anychart.com/releases/v8/geodata/custom/world_source/world_source.js"></script>
  <script src="https://cdn.anychart.com/maps-data/world-default-data-set.js"></script>
  <script type="text/javascript">anychart.onDocumentReady(function() {

    var map = anychart.choropleth();

    map.geoData(anychart.maps.world_source);

    var scale = anychart.scales.ordinalColor();
    scale.colors(['#81d4fa', '#4fc3f7', '#29b6f6', '#039be5', '#0288d1']);

    var series = map.choropleth(worldDefaultDataSet);
    series.colorScale(scale);

  
    map.container('container');

    map.draw();
});</script>
 </body>
</html>
 ```
### 🚀 Rodar o projeto

### Utilize Live-Server para rodar ou:

```bash 
npx serve .
```
### Exemplo:

![image](https://github.com/user-attachments/assets/367d78a7-ec70-41ca-a58d-d1fe39c870b4)
