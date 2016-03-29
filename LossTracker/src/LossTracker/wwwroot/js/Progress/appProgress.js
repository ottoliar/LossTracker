// appProgress.js -- App for progress page
(function () {

    'use strict';

    angular.module('appProgress', ['ngAnimate', 'mgcrea.ngStrap', 'simpleControls',
            'entry', 'weight', 'chart.js', 'ngRoute'])
            .config(function ($routeProvider, $locationProvider) {

                $routeProvider.when("/", {
                    templateUrl: "/views/Progress/progressIndex.html"
                });

                $routeProvider.otherwise({ redirectTo: "/" });
            });
})();