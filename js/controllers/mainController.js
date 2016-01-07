
/**
 * Main controller
 *
 */
angular.module('mapsapp')
.controller('mainController', [ '$scope', 'leafletData', 'randomMarkersService', 'mapHelperService', function($scope, leafletData, randomMarkersService, mapHelperService) {
    
    //configuration
    var MARKERS_COUNT = 3,
        DEFAULT_ZOOM = 11,
        DEFAULT_CENTER = { lat: 40.48, lng: -3.76 },
        DEFAULT_ICON_SIZE = [ 70, 70 ],
        DEFAULT_ICON_ANCHOR = [ 33, 52 ];
    
    var leafletMap, mapDistance;
    
    //default elements properties
    var defaults = {
        marker: {
            focus: false,
            message: null,
            draggable: false,
            icon: {
                iconUrl: 'img/1.svg',
                iconSize: angular.copy( DEFAULT_ICON_SIZE ),
                iconAnchor: angular.copy( DEFAULT_ICON_ANCHOR )
            }
        },
        path: {
            color: 'red',
            dashArray: '5',
            weight: 2
        }
    };
    
    $scope.map = {
        place: {
            lat: DEFAULT_CENTER.lat,
            lng: DEFAULT_CENTER.lng,
            zoom: DEFAULT_ZOOM
        },
        defaults: {
            tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
            tileLayerOptions: {
                opacity: 0.9,
                detectRetina: true,
                reuseTiles: true
            },
            scrollWheelZoom: true
        },
        controls: {
            scale: true
        },
        markers: {},
        paths: {}
    };
    
    //Create markers
    leafletData.getMap().then(function(map){
        leafletMap = map;
        mapDistance = mapHelperService.getMapDistance();
        var markers = randomMarkersService.generateMarkers( MARKERS_COUNT, defaults );
        angular.extend( $scope.map, markers );
    });
    
    /**
     * Update markers size
     *
     */
    var updateMarkersSize = function(){
        if (!leafletMap) {
            return;
        }
        var newMapDistance = mapHelperService.getMapDistance(),
            mapDistanceDelta = mapDistance / newMapDistance;
        
        angular.forEach($scope.map.markers, function ( marker ) {
            
            marker.icon.iconSize[0] = DEFAULT_ICON_SIZE[0] * mapDistanceDelta;
            marker.icon.iconSize[1] = DEFAULT_ICON_SIZE[1] * mapDistanceDelta;
            marker.icon.iconAnchor[0] = DEFAULT_ICON_ANCHOR[0] * mapDistanceDelta;
            marker.icon.iconAnchor[1] = DEFAULT_ICON_ANCHOR[1] * mapDistanceDelta;
            
        });
    };
    
    $scope.$on('leafletDirectiveMap.zoomend', updateMarkersSize );
    
}]);
