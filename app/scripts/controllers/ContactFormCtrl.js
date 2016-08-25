
'use strict';

myApp.controller('ContactFormCtrl', ['$scope', '$rootScope', '$timeout', '$http', 'MY_EVENTS', function($scope, $rootScope, $timeout, $http, MY_EVENTS) {

    $scope.form = {

        handle: false,
        submit: false
    };

    //Reset feedback notifier
    $rootScope.$emit(MY_EVENTS.FEEDBACK_NOTIFY_INIT);

    // Form patterns
    // $scope.REGEX_NAMES = '/^[0-9]+$/';
    // $scope.REGEX_NAMES = '/^(?=.*[a-zA-Z]{1,})(?=.*[\d]{0,})[a-zA-Z0-9]$/';
    $scope.REGEX_EMAIL = '/^(([a-zA-Z]|[0-9])|([-]|[_]|[.]))+[@](([a-zA-Z0-9])|([-])){2,63}[.](([a-zA-Z0-9]){2,63})+$/gi';
    // ^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$


    // Testing
    $scope.fillForm  = function (evt){

        if (typeof evt !== undefined) evt.preventDefault();

        $scope.guest = {
            company: "Company",
            email: "emailMe@yo.frd",
            firstName: "firstName",
            telephone: "+33705060408",
            message: "An integer between 2 and 36 that represents the radix (the base in mathematical numeral systems) of the above mentioned string. Specify 10 for the decimal numeral system commonly used by humans. Always specify this parameter to eliminate reader confusion and to guarantee predictable behavior. Different implementations produce different results when a radix is not specified, usually defaulting the value to 10.",
            name: "Name",
            rs: "Company raison"
        };
    }

    $scope.formSubmit = function (evt) {

        if (typeof evt !== undefined) evt.preventDefault();

        $scope.form.submit = true;
        console.log($scope.echoForm.$name+ ' is Valid:' +$scope.echoForm.$valid);

        if ($scope.echoForm.$valid) {

            $rootScope.$emit(MY_EVENTS.FEEDBACK_NOTIFY_LOADING);
            console.log($scope.echoForm.$name+ ' is Valid:' +$scope.echoForm.$valid);

            // @TODO: set caching
            $http({method: 'POST', url: CONFIG_VARS.WP_TEMPLATE_URL+'/handle-mail.php', params: $scope.guest}).then(
                function(datas){

                    console.log('Datas: ', datas);
                    $scope.form.handle = false;

                    $timeout(function(){

                        $rootScope.$emit(MY_EVENTS.FEEDBACK_NOTIFY_COMPLETE, {'feedbackSuccess': datas.data.status});

                    }, 3000);

                },
                function(error){

                    console.warn(error);
                    $scope.form.handle = false;
                    $rootScope.$emit(MY_EVENTS.FEEDBACK_NOTIFY_COMPLETE);
                }
            );

        }

    }

}]);
