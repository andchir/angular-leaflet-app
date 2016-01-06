
/**
 * Maps Application
 *
 * 
 */
var app = angular.module('mapsapp', ['leaflet-directive']);

app.config(function($logProvider){
    $logProvider.debugEnabled(false);
});
