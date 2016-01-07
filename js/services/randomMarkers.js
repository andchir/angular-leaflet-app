
/**
 * Random markers service
 *
 */
angular.module('mapsapp')
.service('randomMarkersService', function( leafletData, mapHelperService ) {
    
    var self = this;
    this._map = null;
    
    //Get map object
    leafletData.getMap().then(function(map){
        self._map = map;
    });
    
    /**
     * Generate markers
     * @param {Number} markers_count
     * @param {Object} options
     */
    this.generateMarkers = function( markers_count, options ){
        
        var output = {
            markers: {},
            paths: {}
        };
        
        for( var i = 1; i <= markers_count; i++ ){
            var point1 = this.getRandomPoint();
            var point2 = this.getRandomPoint();
            var angle = mapHelperService.calcAngle( point1, point2 );
            
            output.markers[ 'm' + i + '1' ] = angular.extend( {}, options.marker, point1, { iconAngle: angle } );
            output.markers[ 'm' + i + '2' ] = angular.extend( {}, options.marker, point2, { iconAngle: angle - 180 } );
            output.paths[ 'p' + i ] = angular.extend( {}, options.path, { latlngs: [ point1, point2 ] } );
            
        }
        
        return output;
    };
    
    /** Get random value between */
    this.randomBetween = function(min, max){
        return Math.random() * ( max - min ) + min;
    };
    
    /** Get random point */
    this.getRandomPoint = function(){
        
        var bounds = this._map.getBounds(),
            northEast = bounds.getNorthEast(),
            southWest = bounds.getSouthWest(),
            output = {};
        
        output.lat = this.randomBetween( southWest.lat, northEast.lat );
        output.lng = this.randomBetween( southWest.lng, northEast.lng );
        
        return output;
    };
    
});