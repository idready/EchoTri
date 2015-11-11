
'use strict';

// @TODO: Replace all jQuery instance with vanilla or angular (jQLite)
myApp.directive('myModalLink', function($document) {

    return {

        scope: {},
        reastrict: 'AE',
        // transclude: true,
        link: function(scope, element, attrs) {

            var coverLayer = angular.element(document.querySelector('.cd-cover-layer'));

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
            };

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

            initModal(element);

            scope.showModal = function showModal(evt){

                evt.preventDefault();

                angular.element(document.getElementsByTagName('html')).addClass('no-overflow');
                modal.addClass('modal-is-visible');
                coverLayer.addClass('modal-is-visible');
                animateModal(pathsArray, pathSteps, duration, 'open');

                //close modal window
                modal.on('click', function(evt){

                    evt.preventDefault(); // in case it's a link
                    scope.closeModal();
                });
            }

            scope.closeModal = function (){

                angular.element(document.getElementsByTagName('html')).removeClass('no-overflow');
                modal.removeClass('modal-is-visible');
                coverLayer.removeClass('modal-is-visible');
                animateModal(pathsArray, pathSteps, duration, 'close');
            }

            $document.on('keyup', function(evt){

                // ESC or Return
                if(parseInt(evt.keyCode, 10) == 27 || parseInt(evt.keyCode, 10) == 8) {

                    scope.closeModal();
                }
            });

            element.on('click', scope.showModal);

        }
    }

});