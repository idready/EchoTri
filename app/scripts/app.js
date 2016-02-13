
'use strict';

var myApp = angular.module('echoTri', ['ui.router', 'ngMessages', 'uiGmapgoogle-maps']);

// CONFIG
// myApp.config(['$stateProvider', '$httpProvider', '$urlRouterProvider', '$locationProvider', 'uiGmapGoogleMapApiProvider', function($stateProvider,$httpProvider, $urlRouterProvider, $locationProvider, GoogleMapApiProviders) {

//     $urlRouterProvider.otherwise("/");

//     $stateProvider.state('root', {

//         url: '/page',
//         templateUrl: 'template/root.html',
//         controller: 'HomeCtrl'
//     });

//     GoogleMapApiProviders.configure({
//         china: false // default
//     });
//     // $stateProvider.state('root.branch', {

//     //     url: '/page',
//     //     template: '<h1>My Page</h1>',
//     //     controller: 'PageCtrl'
//     // });
// }]);

// Constants
myApp.constant('DIRECTIVE_TEMPLATES', {

    'TEMPLATE_URL': 'scripts/directives/templates/'
});

myApp.constant('MY_EVENTS', {

    'KEYUP': 'keyup',
    'CLICK': 'click',
    'MODAL_CLOSE': 'modal_close',
    'MODAL_OPEN_COMPLETED': 'modal_open_completed',
    'MODAL_CLOSE_COMPLETED': 'modal_close_completed',
    'MODAL_PATH_OPEN_COMPLETED': 'modal_path_open_completed',
    'MODAL_PATH_CLOSE_COMPLETED': 'modal_path_close_completed',
    'MODAL_LOAD_DATAS': 'modal_load_datas',
    'FEEDBACK_NOTIFY_INIT': 'MessageNotify:init',
    'FEEDBACK_NOTIFY_LOADING': 'MessageNotify:loading',
    'FEEDBACK_NOTIFY_COMPLETE': 'MessageNotify:complete'
});


myApp.config(function(){});
myApp.run(function(){});
