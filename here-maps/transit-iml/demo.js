function addIml(map) {

    const catalogHrn = 'hrn:here:data::olp-here:dh-showcase-dc-transit';
    
    const layerId = 'dc-transit';
    const service = platform.getIMLService();
    const imlProvider = new H.service.iml.Provider(service, catalogHrn, layerId);

    const style = imlProvider.getStyle();
    const styleConfig = style.extractConfig(['iml']);

    styleConfig.layers.iml.lines.draw.lines.dash = [1, 1];
    styleConfig.layers.iml.lines.draw.lines.width = [[5, 5000], [8, 800], [10, 200], [12, 160], [14, 60], [18, 20]];

    style.mergeConfig(styleConfig);

    map.addLayer(new H.map.layer.TileLayer(imlProvider));
}
const platform = new H.service.Platform({
    apikey: 'SUA_APIKEY_AQUI'
});
const defaultLayers = platform.createDefaultLayers();

const map = new H.Map(
    document.getElementById('map'),
    defaultLayers.vector.normal.map,
    {
        center: new H.geo.Point(38.90192, -76.97605),
        zoom: 12
    }
);
window.addEventListener('resize', () => map.getViewPort().resize());

const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

const ui = H.ui.UI.createDefault(map, defaultLayers);

addIml(map);
