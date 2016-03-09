// appDiary.js -- Main app for food/macro diary
(function () {

    'use strict';

    angular.module('appDiary', ['simpleControls', 'entry', 'macro', 'chart.js', 'ngRoute'])
            .config(function ($routeProvider) {

                $routeProvider.when("/", {
                    templateUrl: "/views/diaryIndex.html"
                });

                $routeProvider.otherwise({ redirectTo: "/" });

            });


})();