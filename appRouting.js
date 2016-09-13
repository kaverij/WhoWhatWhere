var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html',
            controller: 'mainController'
        })
        .state('displayList', {
            url: '/displayList/:location/:item',
            templateUrl: 'views/displayList.html',
            controller: 'displayLocation'
        });
});