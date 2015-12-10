
'use strict';

myApp.controller('GoogleMapsCtrl', ['$scope', '$timeout', 'uiGmapLogger', 'uiGmapGoogleMapApi', function($scope, $timeout, $log, GoogleMapApi) {

    console.log('gMaps ctrl');

    $log.currentLevel = $log.LEVELS.debug;

    // GoogleMapApi.currentLevel = $log.LEVELS.debug;
    // $log.info("hmm"); //not logged
    // $log.debug("huh!"); //logged
    // $log.warn("uhoh!"); //logged
    // $log.error("oh crap!"); //logged

    $scope.options = {scrollwheel: false};

    // Maps coordinates
    $scope.map = {
        center: { latitude: 47.9791492, longitude: 0.170657 },
        zoom: 16
    }
    // The marker
    $scope.marker = {

        id: 0,
        coords: {
            latitude: 47.9791492,
            longitude: 0.170657
        },
        options: { draggable: true },
        show: true,

    };
    // The window title
    $scope.title = 'EchoTri';

    $scope.windowOptions = {

        visible: false
    };

    $scope.onClick = function() {

        // @TODO: add animation on window title display
        $scope.windowOptions.visible = !$scope.windowOptions.visible;
    };

    GoogleMapApi.then(

        function(maps) {

            // maps.visualRefresh = true;
            $log.debug('Google Map successfully loaded')


            $timeout(function(){

                $scope.windowOptions.visible = !$scope.windowOptions.visible;
            }, 500);

            console.log(maps);
        },
        function(errors) {

            $log.error('GoogleMapApi Error: ', errors); //logged
        }
    );


}]);
