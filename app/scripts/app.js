
'use strict';

var myApp = angular.module('echoTri', ['ui.router']);

// CONFIG
myApp.config(['$stateProvider', '$httpProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider,$httpProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider.state('root', {

        url: '/page',
        templateUrl: 'template/root.html',
        controller: 'HomeCtrl'
    });

    // $stateProvider.state('root.branch', {

    //     url: '/page',
    //     template: '<h1>My Page</h1>',
    //     controller: 'PageCtrl'
    // });
}]);

myApp.run(function(){});