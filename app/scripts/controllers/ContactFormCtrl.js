
'use strict';

myApp.controller('ContactFormCtrl', ['$scope', '$timeout', '$http', function($scope, $timeout, $http) {

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

        console.log($scope.echoForm.$name+ ' is Valid:' +$scope.echoForm.$valid);

        if ($scope.echoForm.$valid) {

            // $scope.form.handle = true;
            console.log($scope.echoForm.$name+ ' is Valid:' +$scope.echoForm.$valid);
            // @TODO: set caching
            $http({method: 'POST', url: CONFIG_VARS.WP_TEMPLATE_URL+'/handle-mail.php', params: $scope.guest}).then(
                function(datas){

                    console.log('Datas: ', datas);
                    $scope.form.handle = false;
                },
                function(error){
                    console.warn(error);
                    $scope.form.handle = false;
                });
        }

        // $timeout(function(){
        //     console.log('disabled')

        // }, 20000);
    }

}]);