
'use strict';

myApp.controller('ContactFormCtrl', ['$scope', '$timeout', function($scope, $timeout) {


    $scope.echoForm = {};
    $scope.form = {

        handle: false,
        submit: false
    };

    $scope.REGEX_EMAIL = '/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i';
    // ^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$
    $scope.$on('loading', function(){

        console.log('loading');
    });

    $scope.formSubmit = function formSubmit(evt) {

        if (typeof evt !== undefined) {

            evt.preventDefault();
        }

        $scope.handle = true;
        console.log($scope.echoForm);
        $timeout(function(){
            console.log('disabled')
            $scope.handle = false;
        }, 1000);
    }

}]);