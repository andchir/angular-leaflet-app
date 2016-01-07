describe('mapHelperService', function() {
    
    var mapHelperService;
    
    beforeEach(function (){
        
        module('mapsapp');
        
        inject(function(_mapHelperService_) {
            mapHelperService = _mapHelperService_;
        });
        
    });
    
    it('Should have an calcAngle function', function () {
        expect(angular.isFunction(mapHelperService.calcAngle)).toBe(true);
    });
    
    it('Should be less than 360', function () {
        var point1 = {lat: 40.44039457601257, lng: -4.144411185838308};
        var point2 = {lat: 40.45788073397881, lng: -3.591984267103925};
        expect(mapHelperService.calcAngle(point1, point2)).toBeLessThan(360);
    });
    
});