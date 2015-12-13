
'use strict';

var myApp = angular.module('echoTri', ['ui.router', 'uiGmapgoogle-maps']);

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
myApp.constant('DIRECTIVES_TEMPLATES', {

    'template_url': ''
});

myApp.constant('MY_EVENTS', {

    'KEYUP': 'keyup',
    'CLICK': 'click',
    'MODAL_OPEN_COMPLETED': 'modal_open_completed',
    'MODAL_CLOSE_COMPLETED': 'modal_close_completed',
    'MODAL_PATH_OPEN_COMPLETED': 'modal_path_open_completed',
    'MODAL_PATH_CLOSE_COMPLETED': 'modal_path_close_completed'
});


myApp.config(function(){});
myApp.run(function(){});

