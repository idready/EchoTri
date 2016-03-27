
'use strict';

myApp.filter('cleanHtml', [function() {

    return function(input, concat) {

        console.log('INPUT : ', input);
        if (input == undefined) return;
        return (concat) ? CONFIG_VARS.WP_TEMPLATE_URL + input : input;
    }

}]);
