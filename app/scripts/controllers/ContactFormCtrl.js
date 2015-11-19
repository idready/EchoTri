
'use strict';

myApp.controller('ContactFormCtrl', ['$scope', function($scope) {


    $scope.echoForm = {};

    $scope.$on('loading', function(){

        console.log('loading');
    });

    $scope.formSubmit = function formSubmit(evt) {

        if (typeof evt !== undefined) {

            evt.preventDefault();
        }

        console.log($scope.echoForm);
    }

}]);