describe('randomMarkersService', function() {
    
    var randomMarkersService;
    
    beforeEach(function (){
        
        module('mapsapp');
        
        inject(function(_randomMarkersService_) {
            randomMarkersService = _randomMarkersService_;
        });
        
    });
    
    afterEach(function() {
        
    });
    
    it('should have an randomBetween function', function () { 
        expect(angular.isFunction(randomMarkersService.randomBetween)).toBe(true);
    });
    
});