var mapMinZoom = 0;
var mapMaxZoom = 6;
var map = L.map('map', {
	maxZoom: mapMaxZoom,
	minZoom: mapMinZoom,
	crs: L.CRS.Simple
}).setView([0, 0], mapMaxZoom);

var mapBounds = new L.LatLngBounds(
	map.unproject([0, 6912], mapMaxZoom),
	map.unproject([9984, 0], mapMaxZoom));

map.fitBounds(mapBounds);
L.tileLayer('tiles/{z}/{x}/{y}.png', {
	minZoom: mapMinZoom, maxZoom: mapMaxZoom,
	bounds: mapBounds,
	attribution: 'Map data &copy; ColorPlan',
	noWrap: true
}).addTo(map);