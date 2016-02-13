
'use strict';

myApp.directive('myFeedbackNotifier', ['MY_EVENTS', '$rootScope', '$timeout', function(MY_EVENTS, $rootScope, $timeout) {


    return {

        scope: {},
        restrict: 'ACE',
        templateUrl: CONFIG_VARS.WP_TEMPLATE_URL + '/js/directives/templates/feedbackNotifier.html',
        transclude: true,
        link: function(scope, element, attrs) {

            //Initial state
            scope.init = function(){

                console.log('Init');
                scope.state = {

                    isVisible: false,
                    isLoading: false,
                    isComplete: false
                };
            };

            $rootScope.$on(MY_EVENTS.FEEDBACK_NOTIFY_INIT, function(){
                scope.init();
            });

            $rootScope.$on(MY_EVENTS.FEEDBACK_NOTIFY_LOADING, function(){

                scope.state = {

                    isVisible: true,
                    isLoading: true,
                    isComplete: false
                };
                console.info('Notify Loading');
            });

            $rootScope.$on(MY_EVENTS.FEEDBACK_NOTIFY_COMPLETE, function(){

                scope.state = {

                    isVisible: true,
                    isLoading: false,
                    isComplete: true
                };
                console.info('Notify complete');
                //Dispatch an event to close modal or close modal directly here
                if(angular.isDefined(attrs.feedbackTimeout) && typeof parseInt(attrs.feedbackTimeout, 10) === 'number') {

                    $timeout(function(){

                        $rootScope.$broadcast(MY_EVENTS.MODAL_CLOSE);
                    }, attrs.feedbackTimeout);
                }
            });

        }

    }

}]);
