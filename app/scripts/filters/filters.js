
'use strict';

myApp.filter('cleanhtml', ['$sce', function($sce) {


    return $sce.trustAsHtml;

}]);