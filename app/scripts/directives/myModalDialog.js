
'use strict';

myApp.directive('myModalDialog', function() {

    return {

        scope: {},
        reastrict: 'AE',
        // transclude: true,
        link: function(scope, element, attr) {

            console.log('dialog Modal');

        }
    }

});