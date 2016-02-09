// searchController.js -- Search food database
(function () {

    'use strict';

    angular.module('appDiary')
        .controller('InstantSearchCtrl', function ($scope, $http, diaryTracker) {

            var url = '/api/foods/';

            $scope.$watch('search', function () {
                fetchFoods();
            });

            $scope.addDiaryEntry = function (FoodId, numServings, _callback) {
               diaryTracker.addDiaryEntry(FoodId, numServings, getAllEntries);
            };

            // Live feed results of database objects matching user query in search bar
            function fetchFoods () {
                if ($scope.details === undefined || $scope.search.length !== 0) {
                    var queryUrl = url + $scope.search;
                    $http.get(queryUrl).then(function (response) {
                        $scope.details = response.data;
                    });
                } else {
                    $scope.details = undefined;
                }
            }

            // Gets the latest entries for today's date from the DB
            function getAllEntries() {
                diaryTracker.getEntriesForToday().then(onComplete, onError);
            }

            // Callbacks once getting latest diary entries has completed
            var onComplete = function (data) {
                console.log(data);
            };

            var onError = function (response) {
                $scope.error = "Error retrieving current date's entries from DB";
            }

            // Utility function to select all entered characters in text box
            $scope.select = function () {
                this.setSelectionRange(0, this.value.length);
            }

            getAllEntries();
     });

})();