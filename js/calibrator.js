/*
 * Leaflet.calibrator assumes that you have already included the Leaflet library and the leaflet.draw plugin
 */

L.Calibrator = L.Class.extend({
	_calibrationDrawer : null,

	addTo: function (map) {
		this._map = map;

		this._calibrationDrawer = new L.CalibratorLine( this._map, {
			shapeOptions: {
				color : '#40A919',
				weight: 4,
				opacity: 1
			},
			calibrator : this
		});
		this._calibrationDrawer.enable();

		return this;
	},

	hasCalibrated : function() {
		return this._calibrationDrawer._calibratedMeasurement > 0;
	},

	_calibratorMeasuredDistance : function() {
		return this._calibrationDrawer._measurementRunningTotal;
	},

	_calibratorCalibratedDistance : function() {
		return this._calibrationDrawer._calibratedMeasurement;
	},

	calculateCalibratedDistance : function( measuredDistance ) {
		return ( measuredDistance * this._calibratorCalibratedDistance() ) / this._calibratorMeasuredDistance();
	}
});


L.CalibratorLine = L.Draw.Polyline.extend({
	_calibratedMeasurement : 0,
	options: {
		startText : 'Click to start calibration measurement',
		endText : 'Click to end calibration measurement'
	}
});

L.CalibratorLine.prototype._getTooltipText = function () {
	var labelText;
	if ( this._markers.length === 0) {
		labelText = {
			text: this.options.startText
		};
	} else {
		labelText = {
			text: this.options.endText
		};
	}
	return labelText;
};


L.CalibratorLine.prototype.addVertex = function( latlng ){
	L.Draw.Polyline.prototype.addVertex.call( this, latlng );
	if ( this._markers.length !== 2 )
		return;

	this._finishShape();
	this._calibratedMeasurement = prompt( 'What\'s the distance we just measured? (in m)' );
	L.control.scale().addTo( this._map );
};