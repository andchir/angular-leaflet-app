
/**
 * Map helper service
 *
 */
angular.module('mapsapp')
.service('mapHelperService', function( leafletData ) {
    
    var self = this;
    this._map = null;
    
    //Get map object
    leafletData.getMap().then(function(map){
        self._map = map;
    });
    
    /** Get degrees */
    this.degrees = function( n, radians ) {
        return n * ( radians
            ? ( Math.PI / 180 )
            : ( 180 / Math.PI ) );
    }
    
    /**
     * Calculate angle between coordinates
     * @param {Object} coord1
     * @param {Object} coord2
     * @returns {Number}
     */
    this.calcAngle = function( coord1, coord2 ) {
        var startLat = this.degrees( coord1.lat, true ),
            startLong = this.degrees( coord1.lng, true ),
            endLat = this.degrees( coord2.lat, true ),
            endLong = this.degrees( coord2.lng, true );
      
        var dLong = endLong - startLong,
            dPhi = Math.log( Math.tan( endLat / 2 + Math.PI / 4 ) / Math.tan( startLat / 2 + Math.PI / 4 ) );
        if ( Math.abs( dLong ) > Math.PI ){
            if ( dLong > 0 )
                dLong = -( 2 * Math.PI - dLong );
            else
                dLong = ( 2 * Math.PI + dLong );
        }
        return ( this.degrees( Math.atan2( dLong, dPhi ) ) + 360 ) % 360;
    };
    
    /** Get map scale */
    this.getMapDistance = function(){
        var y = this._map.getSize().y / 2;
        return this._map.containerPointToLatLng([0, y])
            .distanceTo(this._map.containerPointToLatLng([100, y]));
    };
    
});