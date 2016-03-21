// appDiary.js -- Main app for food/macro diary
(function () {

    'use strict';

    angular.module('appDiary', ['ngAnimate', 'mgcrea.ngStrap', 'simpleControls', 'entry',
            'macro', 'chart.js', 'ngRoute'])
            .config(function ($routeProvider, $locationProvider) {

                $routeProvider.when("/", {
                    templateUrl: "/views/diaryIndex.html"
                });

                $routeProvider.when("/search/:mealId", {
                    controller: "addController",
                    controllerAs: "vm",
                    templateUrl: "/views/diaryIndexSearchView.html"
                });

                $routeProvider.when("/editor/:entryId", {
                    controller: "entryEditorController",
                    controllerAs: "vm",
                    templateUrl: "/views/diaryIndexEditor.html"
                });

                $routeProvider.when("/create", {
                    controller: "createController",
                    controllerAs: "vm",
                    templateUrl: "/views/diaryIndexCreateNewFood.html"
                });

                $routeProvider.otherwise({ redirectTo: "/" });

            });


})();