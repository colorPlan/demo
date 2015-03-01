var mapMinZoom = 0;
var mapMaxZoom = 6;
var map = L.map('map', {
	maxZoom: mapMaxZoom,
	minZoom: mapMinZoom,
	crs: L.CRS.Simple
}).setView([-40, 80], 3 );

var mapBounds = new L.LatLngBounds(
	map.unproject([0, 6912], 0),
	map.unproject([9984, 0], 0));

L.tileLayer('tiles/{z}/{x}/{y}.png', {
	minZoom: mapMinZoom,
	maxZoom: mapMaxZoom,
	attribution: 'Map data &copy; ColorPlan',
	bounds: mapBounds,
	errorTileUrl: 'tiles/empty.png'
}).addTo(map);

var featureGroup = L.featureGroup().addTo(map);

var drawControl = new L.Control.Draw({
	edit: {
		featureGroup: featureGroup
	},
	draw: {
		polyline: {
			shapeOptions: {
				color : '#FF0000',
				weight: 4,
				opacity: 1
			}
		}
	}
}).addTo(map);

map.on('draw:created', function(e) {
	featureGroup.addLayer(e.layer);
});

new L.Calibrator( map );

