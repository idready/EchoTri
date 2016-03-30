
'use strict';

myApp.filter('cleanHtml', [function() {

    return function(input, concat) {

        if (input == undefined) return '';
        // console.info('CONCAT ',concat)
        // console.info('INPUT ',input)
        return (concat) ? CONFIG_VARS.WP_TEMPLATE_URL + input : input;
    }

}]);
