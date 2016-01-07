describe('mainController', function() {
    
    var $controller,
        $compile,
        $rootScope,
        $timeout,
        leafletData,
        scope;

    beforeEach(function (){
        module('mapsapp');
    });
    
    beforeEach(inject(function(_$controller_, _$compile_, _$rootScope_, _$timeout_, _leafletData_) {
        $controller = _$controller_;
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
        leafletData = _leafletData_;
        scope = $rootScope.$new();
    }));
    
    it('Should defined $scope.map.place', function() {
        var controller = $controller('mainController', { $scope: scope });
        expect(scope.map.place).toBeDefined();
    });
    
    it('Should defined $scope.map.defaults', function() {
        var controller = $controller('mainController', { $scope: scope });
        expect(scope.map.defaults).toBeDefined();
    });
    
    it('should compile leaflet directive', function() {
        var element = $compile('<leaflet width="100%" height="480px"></leaflet>')($rootScope);
        $rootScope.$digest();
        expect(element.html()).toContain('leaflet-map-pane');
    });
    
    it('should load map object', function() {
        var element = angular.element('<leaflet></leaflet>');
        element = $compile(element)(scope);
        var leafletMap;
        leafletData.getMap().then(function(map) {
            leafletMap = map;
        });
        scope.$digest();
        expect(angular.isObject(leafletMap)).toEqual(true);
    });
    
});