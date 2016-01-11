
'use strict';

myApp.controller('ContactFormCtrl', ['$scope', '$timeout', function($scope, $timeout) {

    console.log('formctrl');

    $scope.form = {

        handle: false,
        submit: false
    };

    // @TODO: Don't send request to wp for modal with defined template
    // Form patterns
    // $scope.REGEX_NAMES = '/^[0-9]+$/';
    // $scope.REGEX_NAMES = '/^(?=.*[a-zA-Z]{1,})(?=.*[\d]{0,})[a-zA-Z0-9]$/';
    $scope.REGEX_EMAIL = '/^(([a-zA-Z]|[0-9])|([-]|[_]|[.]))+[@](([a-zA-Z0-9])|([-])){2,63}[.](([a-zA-Z0-9]){2,63})+$/gi';
    // ^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$
    $scope.$on('loading', function(){

        console.log('loading');
    });

    $scope.formSubmit = function formSubmit(evt) {

        if (typeof evt !== undefined) {

            evt.preventDefault();
        }
        console.log(evt);
        console.log($scope.echoForm);
        console.log($scope.guest);

        $scope.handle = true;

        $timeout(function(){
            console.log('disabled')
            $scope.handle = false;
        }, 1000);
    }

}]);