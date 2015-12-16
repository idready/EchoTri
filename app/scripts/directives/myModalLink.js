
'use strict';

myApp.directive('myModalLink', ['MY_EVENTS', 'DIRECTIVE_TEMPLATES', '$document', '$timeout', '$http', '$compile', '$rootScope', function(MY_EVENTS, DIRECTIVE_TEMPLATES, $document, $timeout, $http, $compile, $rootScope) {

    return {

        scope: {
            pageType: '@pageType',
            pageTemplate: '@pageTemplate'
        },
        reastrict: 'AE',
        // transclude: true,
        link: function(scope, element, attrs) {


            var coverLayer = angular.element(document.querySelector('.cd-cover-layer')),
                pageType = (angular.isUndefined(scope.pageType)) ? false : scope.pageType;
                scope.pageTemplate = (angular.isUndefined(scope.pageTemplate)) ? false : scope.pageTemplate;
                scope.timeOut = null;
                $rootScope.isLoading = true;

            /*
                convert a cubic bezier value to a custom mina easing
                http://stackoverflow.com/questions/25265197/how-to-convert-a-cubic-bezier-value-to-a-custom-mina-easing-snap-svg
            */
            var duration = 600,
                epsilon = (1000 / 60 / duration) / 4,
                firstCustomMinaAnimation = bezier(0.63,0.35,0.48,0.92, epsilon); //@TODO: change custom bezier function

            // console.log(element.attr('data-modal-event'));
            var modalTriggerId =  element.attr('data-modal-event'),
                modal = angular.element(document.querySelector('.cd-modal[data-modal="'+ modalTriggerId +'"]')),
                svgCoverLayer = modal.children('.cd-svg-bg'),
                paths = svgCoverLayer.find('path'),
                pathStepsContainer = angular.element(document.querySelector('.cd-svg-bg')),
                pathsArray = [],
                pathSteps = [];

            function animateModal(paths, pathSteps, duration, animationType) {

                var path1 = ( animationType == 'open' ) ? pathSteps[1] : pathSteps[0],
                    path2 = ( animationType == 'open' ) ? pathSteps[3] : pathSteps[2],
                    path3 = ( animationType == 'open' ) ? pathSteps[5] : pathSteps[4];
                paths[0].animate({'d': path1}, duration, firstCustomMinaAnimation);
                paths[1].animate({'d': path2}, duration, firstCustomMinaAnimation);
                paths[2].animate({'d': path3}, duration, firstCustomMinaAnimation);

                if(animationType == 'close') {

                    scope.$emit(MY_EVENTS.MODAL_PATH_CLOSE_COMPLETED);
                } else {

                    scope.$emit(MY_EVENTS.MODAL_PATH_OPEN_COMPLETED);
                }

            }

            function bezier(x1, y1, x2, y2, epsilon){
                //https://github.com/arian/cubic-bezier
                var curveX = function(t){
                    var v = 1 - t;
                    return 3 * v * v * t * x1 + 3 * v * t * t * x2 + t * t * t;
                };

                var curveY = function(t){
                    var v = 1 - t;
                    return 3 * v * v * t * y1 + 3 * v * t * t * y2 + t * t * t;
                };

                var derivativeCurveX = function(t){
                    var v = 1 - t;
                    return 3 * (2 * (t - 1) * t + v * v) * x1 + 3 * (- t * t * t + 2 * v * t) * x2;
                };

                return function(t){

                    var x = t, t0, t1, t2, x2, d2, i;

                    // First try a few iterations of Newton's method -- normally very fast.
                    for (t2 = x, i = 0; i < 8; i++){
                        x2 = curveX(t2) - x;
                        if (Math.abs(x2) < epsilon) return curveY(t2);
                        d2 = derivativeCurveX(t2);
                        if (Math.abs(d2) < 1e-6) break;
                        t2 = t2 - x2 / d2;
                    }

                    t0 = 0, t1 = 1, t2 = x;

                    if (t2 < t0) return curveY(t0);
                    if (t2 > t1) return curveY(t1);

                    // Fallback to the bisection method for reliability.
                    while (t0 < t1){
                        x2 = curveX(t2);
                        if (Math.abs(x2 - x) < epsilon) return curveY(t2);
                        if (x > x2) t0 = t2;
                        else t1 = t2;
                        t2 = (t1 - t0) * 0.5 + t0;
                    }

                    // Failure
                    return curveY(t2);

                };

            }

            function initModal(modalTrigger) {

                //store Snap objects
                pathsArray[0] = Snap('#'+paths.eq(0).attr('id')),
                pathsArray[1] = Snap('#'+paths.eq(1).attr('id')),
                pathsArray[2] = Snap('#'+paths.eq(2).attr('id'));

                //store path 'd' attribute values
                pathSteps[0] = pathStepsContainer.attr('data-step1');
                pathSteps[1] = pathStepsContainer.attr('data-step2');
                pathSteps[2] = pathStepsContainer.attr('data-step3');
                pathSteps[3] = pathStepsContainer.attr('data-step4');
                pathSteps[4] = pathStepsContainer.attr('data-step5');
                pathSteps[5] = pathStepsContainer.attr('data-step6');

            }
            // console.log(scope.pageType);
            // console.log(scope.pageTemplate);
            initModal(element);

            scope.showModal = function showModal(evt){

                evt.preventDefault();
                $rootScope.isLoading = true;

                var templateUrl = (scope.pageTemplate) ? scope.pageTemplate : 'default';

                $http.get(DIRECTIVE_TEMPLATES.TEMPLATE_URL +templateUrl+ '.html')
                    .success(function(datas){

                        $rootScope.isLoading = false;
                        var templateData = (angular.isDefined(datas.data)) ? datas.data : datas;
                        var linkFn = $compile('<div class="span-xs-12 modal-page-content">' +templateData+ '</div>');
                        var element = linkFn(scope);

                        angular.element(document.querySelector('.cd-modal-dyn-content')).append(element);
                    })
                    .error(function(errors){

                        console.warn(errors);
                    });


                // Remove overflow on the page to avoid double scroll (modal and the page)
                angular.element(document.getElementsByTagName('html')).addClass('no-overflow');

                // Animate the svg path
                animateModal(pathsArray, pathSteps, duration, 'open');

                // Scroll to top
                // @TODO: Scroll to top
                // Velocity(angular.element(document.querySelector('.cd-modal-content')), {
                //     duration: 100,
                //     loop: false,
                //     easing: 'ease-in-out'
                // });

                if (angular.isDefined(scope.pageType)) {
                    modal.addClass(pageType);
                    coverLayer.addClass(scope.pageType);

                    // load the map
                    if (scope.pageTemplate === 'reachUs') {
                        $rootScope.$emit('gMapsEvent:load');
                    }
                }


            }

            scope.closeModal = function closeModal() {

                // evt.preventDefault();
                angular.element(document.getElementsByTagName('html')).removeClass('no-overflow');

                modal.removeClass('modal-is-visible');
                coverLayer.removeClass('modal-is-visible');
                animateModal(pathsArray, pathSteps, duration, 'close');
                angular.element(document.querySelector('.cd-modal-dyn-content')).empty();
            }

            $rootScope.$on('closeModal', function (evt){

                scope.closeModal();
            });

            scope.$on(MY_EVENTS.MODAL_PATH_CLOSE_COMPLETED, function(evt){

                // Avoid the background color change before path animation is completed
                scope.timeOut = $timeout(
                    function(){
                        if (angular.isDefined(scope.pageType)) {
                            modal.removeClass(pageType);
                            coverLayer.removeClass(pageType);
                        }
                    }, 700
                );
                // console.log('Path close animation finished', evt);
            });

            scope.$on(MY_EVENTS.MODAL_PATH_OPEN_COMPLETED, function(evt){

                $timeout(function(){
                    modal.addClass('modal-is-visible');
                    coverLayer.addClass('modal-is-visible');
                }, 100);
                // console.log('Path open animation finished', evt);
            });

            $document.on('keyup', function(evt){

                // ESC to close
                if(parseInt(evt.keyCode, 10) == 27) {

                    scope.closeModal();
                }
            });

            element.on(MY_EVENTS.CLICK, scope.showModal);

        }
    }

}]);