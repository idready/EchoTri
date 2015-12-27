
'use strict';

myApp.directive('myModalDialog', ['MY_EVENTS', '$rootScope', '$compile', '$http', function(MY_EVENTS, $rootScope, $compile, $http) {

    return {

        scope: {},
        reastrict: 'AE',
        // transclude: true,
        link: function(scope, element, attrs) {

            console.log('dialog Modal.');
            console.log(attrs.postid+' : postId');

            // Retrieve datas
            scope.retrievePost = function retrievePost(){

                // if (angular.isDefined(evt)) evt.stopPropagation();

                // console.log(datas.post_id);
                // Make sure it runs on Wordpress context only
                if (typeof ajaxurl !== 'undefined') {

                    // Note: when dealing with WP use params instead of data for $http
                    var requestPost = $http({method: 'POST', url: ajaxurl,  params: { action: 'get_articles', post_id: attrs.postid }});
                    requestPost.then(
                        function(response){

                            scope.title = response.data.title;
                            scope.content = response.data.content;

                            $rootScope.isLoading = false;
                            // @TODO: find a way to do this on the template
                            var datas = '<h3 class="page-title">'+scope.title+'</h3>'+
                                        '<div class="page-content">'+scope.content+'</div>';
                            var linkFn = $compile('<div>'+datas+'</div>');
                            var element = linkFn(scope);

                            angular.element(document.querySelector('.modal-page-content .article-content')).append(element);

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