
'use strict';

var myApp = angular.module('echoTri', ['ui.router', 'uiGmapgoogle-maps']);

// CONFIG
myApp.config(['$stateProvider', '$httpProvider', '$urlRouterProvider', '$locationProvider', 'uiGmapGoogleMapApiProvider', function($stateProvider,$httpProvider, $urlRouterProvider, $locationProvider, GoogleMapApiProviders) {

    $urlRouterProvider.otherwise("/");

    $stateProvider.state('root', {

        url: '/page',
        templateUrl: 'template/root.html',
        controller: 'HomeCtrl'
    });

    GoogleMapApiProviders.configure({
        china: false // default
    });
    // $stateProvider.state('root.branch', {

    //     url: '/page',
    //     template: '<h1>My Page</h1>',
    //     controller: 'PageCtrl'
    // });
}]);

myApp.run(function(){});