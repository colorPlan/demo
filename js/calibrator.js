/*
 * Leaflet.calibrator assumes that you have already included the Leaflet library and the leaflet.draw plugin
 */

L.Calibrator = L.Class.extend({
	initialize: function (map) {
		this._map = map;
		if( confirm( 'Welcome to the takeoffs app, please calibrate the scale by making a line and deciding on the scale.' ) ) {
			var CalibrationDrawer = new L.CalibratorLine(map, {
				showLength: false,
				shapeOptions: {
					color : '#40A919',
					weight: 4,
					opacity: 1
				}
			});
			CalibrationDrawer.enable();
		}
		return this;
	}
});


L.drawLocal.draw.handlers.polyline.tooltip.start = 'Click to begin calibration measurement';
L.drawLocal.draw.handlers.polyline.tooltip.cont = 'Click to end calibration measurement';

L.CalibratorLine = L.Draw.Polyline.extend({});
L.CalibratorLine.prototype.addVertex = function( latlng ){
	L.Draw.Polyline.prototype.addVertex.call( this, latlng );
	if ( this._markers.length !== 2 )
		return;

	this._finishShape();
	measurement = prompt( 'What\'s the distance we just measured? (in ft)' );
};