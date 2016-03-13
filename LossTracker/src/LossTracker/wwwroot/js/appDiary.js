// appDiary.js -- Main app for food/macro diary
(function () {

    'use strict';

    angular.module('appDiary', ['simpleControls', 'entry', 'macro', 'chart.js', 'ngRoute'])
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

                $routeProvider.otherwise({ redirectTo: "/" });

            });


})();