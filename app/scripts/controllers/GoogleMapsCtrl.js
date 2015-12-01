
'use strict';

myApp.controller('GoogleMapsCtrl', ['$scope', 'uiGmapLogger', 'uiGmapGoogleMapApi', function($scope, $log, GoogleMapApi) {

    console.log('gMaps ctrl');

    $log.currentLevel = $log.LEVELS.debug;

    // $scope.$on('gMapsEvent:load', function(){

    //     GoogleMapApi.then(function(maps) {

    //         $scope.googleVersion = maps.version;
    //         maps.visualRefresh = true;
    //         $log.info('$scope.map.rectangle.bounds set');
    //         $scope.map.rectangle.bounds = new maps.LatLngBounds(
    //           new maps.LatLng(55,-100),
    //           new maps.LatLng(49,-78)
    //         );
    //     });
    // });

    $scope.map = {
        center: { latitude: 47.979284, longitude: 0.1695898 },
        zoom: 15
    }
}]);
