
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
                            // angular.element(document.querySelectorAll('img')).parent().addClass('wp-img');

                            // Apply styles class for images
                            angular.forEach( document.querySelectorAll('.modal-page-content img'), function(val, key){

                                // vimeo ?
                                if (angular.element(val).hasClass('alignleft')) angular.element(val).parent().addClass('alignleft');
                                if (angular.element(val).hasClass('alignright')) angular.element(val).parent().addClass('alignright');
                                if (angular.element(val).hasClass('aligncenter')) angular.element(val).parent().addClass('aligncenter');
                                angular.element(val).parent().addClass('wp-img');
                                // @TODO: Add a limit to video width for larger screen (+1400)
                            });

                            // Apply styles class for Video
                            angular.forEach( document.querySelectorAll('.modal-page-content iframe'), function(val, key){

                                // vimeo ?
                                if (val.src.indexOf('vimeo') != -1) angular.element(val).parent().addClass('vimeo');
                                angular.element(val).parent().addClass('flex-video widdescreen');
                                // @TODO: Add a limit to video width for larger screen (+1400)
                            });


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
            // @TODO: add teardown
            scope.$on('$destroy', function(evt){

                console.log(evt);
            });


        }
    }

}]);