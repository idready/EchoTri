
'use strict';

myApp.directive('mySvgFile', [function() {

    return {

        scope: {
            'svgIconId': '@'
        },
        restrict: 'AE',
        transclude: false,
        template: '<svg class="icon" role="image"><use xlink:href="{{svgFile}}" /></svg>',
        link: function(scope, element, attrs){

            scope.svgFile = CONFIG_VARS.WP_TEMPLATE_URL + '/images/svg/svg-defs.svg#shapes-' + scope.svgIconId;
        }
    }
}]);
