describe('randomMarkersService', function() {
    
    var randomMarkersService, $compile, $rootScope;
    
    beforeEach(function (){
        
        module('mapsapp');
        
        inject(function(_randomMarkersService_) {
            randomMarkersService = _randomMarkersService_;
        });
        
    });
    
    beforeEach(inject(
        ['$compile','$rootScope', function($c, $r) {
            $compile = $c;
            $rootScope = $r;
        }]
    ));
    
    afterEach(function() {
        
    });
    
    it('Should have an randomBetween function', function () {
        expect(angular.isFunction(randomMarkersService.randomBetween)).toBe(true);
    });
    
    it('Random value must be great than the first argument', function () {
        expect(randomMarkersService.randomBetween(7, 22)).toBeGreaterThan(7);
    });
    
    it('Random value must be less than the second argument', function () {
        expect(randomMarkersService.randomBetween(7, 22)).toBeLessThan(22);
    });
    
});