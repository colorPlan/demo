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

L.CRS.Earth.distance = function (latlng1, latlng2) {
	var rad = Math.PI / 180,
		lat1 = latlng1.lat * rad,
		lat2 = latlng2.lat * rad,
		a = Math.sin(lat1) * Math.sin(lat2) +
			Math.cos(lat1) * Math.cos(lat2) * Math.cos((latlng2.lng - latlng1.lng) * rad ),
		calculatedDistance = this.R * Math.acos(Math.min(a, 1));

	return calibrator.hasCalibrated() ? calibrator.calculateCalibratedDistance( calculatedDistance ) : calculatedDistance;
};

var calibrator;
var $calibrationModal = $( '#calibration-modal' );
$calibrationModal.modal( 'show' );
$calibrationModal.on( 'click', '.btn-primary', function(){
	calibrator = new L.Calibrator().addTo( map );
	$calibrationModal.modal( 'hide' );
});