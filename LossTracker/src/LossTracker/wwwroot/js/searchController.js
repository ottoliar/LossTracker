// searchController.js -- Search food database
(function () {

    'use strict';

    angular.module('appDiary')
        .controller('InstantSearchCtrl', function ($scope, $http, $filter, diaryTracker) {

            var url = '/api/foods/';

            $scope.today = $filter('date')(new Date(), 'MM/dd/yyyy');

            // Used when user searches the DB for food that is not there
            $scope.noResultFound = false;

            $scope.$watch('search', function (newValue, oldValue) {
                if (newValue == oldValue) return;
                fetchFoods();
            });

            // Use diary tracker service to add a new entry on current date
            $scope.addDiaryEntry = function (FoodId, numServings, _callback) {
                diaryTracker.addDiaryEntry(FoodId, numServings, getAllEntries);
            };

            // Live feed results of database objects matching user query in search bar
            function fetchFoods() {

                if ($scope.searchResults === undefined || $scope.search.length !== 0) {
                    $scope.isBusy = true;
                    var queryUrl = url + $scope.search;
                    $http.get(queryUrl)
                        .then(function (response) {
                            if (response.data.length == 0) {
                                $scope.noResultFound = true;
                            }
                            $scope.searchResults = response.data;
                        }).finally(function () {
                            $scope.isBusy = false;
                        });
                } else {
                    $scope.noResultFound = false;
                    $scope.searchResults = undefined;
                }

            }

            // Gets the latest entries for today's date from the DB
            function getAllEntries() {
                diaryTracker.getEntriesForToday()
                            .then(onComplete, onError);
            }

            // Callbacks once getting latest diary entries has completed
            var onComplete = function (data) {
                //console.log(data);
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