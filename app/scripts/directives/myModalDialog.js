
'use strict';

myApp.directive('myModalDialog', ['MY_EVENTS', '$rootScope', '$compile', '$http', function(MY_EVENTS, $rootScope, $compile, $http) {

    return {

        scope: {
            pagetemplate: '@'
        },
        reastrict: 'AE',
        // transclude: true,
        link: function(scope, element, attrs) {

            // Retrieve datas
            scope.retrievePost = function retrievePost(){

                // Make sure it runs on Wordpress context only and avoid http request for modal with defined template url
                if (typeof ajaxurl !== 'undefined' && scope.pagetemplate == 'default') {

                    // Note: when dealing with WP use params instead of data for $http
                    var requestPost = $http({method: 'POST', url: ajaxurl,  params: { action: 'get_articles', post_id: attrs.postid }});
                    requestPost.then(
                        function(response){

                            $rootScope.isLoading = false;
                            var linkFn = $compile('<div>'+response.data+'</div>');
                            var element = linkFn(scope);

                            angular.element(document.querySelector('.modal-page-content .dyn-content')).append(element);

                        },
                        function(errors){
                            console.warn(errors)
                        }
                    )
                }

            };

            scope.retrievePost();
            // unsubscribe to event
            // scope.$on('destroy', retrieveDatas);


        }
    }

}]);