
'use strict';

myApp.filter('cleanHtml', [function() {

    return function(input, concat) {

        if (input == undefined) return false;

        return (concat) ? CONFIG_VARS.WP_TEMPLATE_URL + input : input;
    }

}]);
