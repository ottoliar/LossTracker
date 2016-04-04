// appDiary.js -- Main app for food/macro diary
(function () {

    'use strict';

    angular.module("appDiary", ["ngAnimate", "mgcrea.ngStrap", "simpleControls", "entry",
            "macro", "chart.js", "ngRoute"])
            .config(function ($routeProvider, $locationProvider) {

                $routeProvider.when("/", {
                    templateUrl: "/views/Entries/diaryIndex.html"
                });

                $routeProvider.when("/search/:mealId", {
                    controller: "addController",
                    controllerAs: "vm",
                    templateUrl: "/views/Entries/diaryIndexSearchView.html"
                });

                $routeProvider.when("/editor/:entryId", {
                    controller: "entryEditorController",
                    controllerAs: "vm",
                    templateUrl: "/views/Entries/diaryIndexEditor.html"
                });

                $routeProvider.when("/create", {
                    controller: "createController",
                    controllerAs: "vm",
                    templateUrl: "/views/Entries/diaryIndexCreateNewFood.html"
                });

                $routeProvider.otherwise({ redirectTo: "/" });

            });


})();