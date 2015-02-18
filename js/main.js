var mapMinZoom = 3;
var mapMaxZoom = 6;
var map = L.map('map', {
	maxZoom: mapMaxZoom,
	minZoom: mapMinZoom,
	crs: L.CRS.Simple
}).setView([-40, 80], 3 );

var mapBounds = new L.LatLngBounds(
	map.unproject([0, 6912], mapMaxZoom),
	map.unproject([9984, 0], mapMaxZoom));

L.tileLayer('tiles/{z}/{x}/{y}.png', {
	minZoom: mapMinZoom,
	maxZoom: mapMaxZoom,
	attribution: 'Map data &copy; ColorPlan',
	bounds: mapBounds,
	errorTileUrl: 'tiles/empty.png'
}).addTo(map);

L.control.scale().addTo(map);

var featureGroup = L.featureGroup().addTo(map);

var drawControl = new L.Control.Draw({
	edit: {
		featureGroup: featureGroup
	}
}).addTo(map);

map.on('draw:created', function(e) {
	featureGroup.addLayer(e.layer);
});