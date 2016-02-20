// searchController.js -- Search food database 
(function () {

    'use strict';

    angular.module('appDiary')
        .controller('FoodSearchCtrl', function ($scope, $http, $filter, diaryTracker) {

            var url = '/api/foods/';

            $scope.today = $filter('date')(new Date(), 'EEEE, MM/dd/yyyy');

            // Will hold entries pulled from the database for today's date
            $scope.entries = [];

            // Used when user searches the DB for food that is not there
            $scope.noResultFound = false;

            $scope.$watch('search', function (newValue, oldValue) {
                if (newValue == oldValue) return;
                _fetchFoods();
            });

            // Use diary tracker service to add a new entry on current date
            $scope.addDiaryEntry = function (FoodId, numServings, _callback) {
                diaryTracker.addDiaryEntry(FoodId, numServings, getAllEntries);
            };

            $scope.alert = function () {
                console.log("testing!");
            }

            // Live feed results of database objects matching user query in search bar
            function _fetchFoods() {

                if ($scope.searchResults === undefined || $scope.search.length !== 0) {
                    $scope.searchIsBusy = true;
                    var queryUrl = url + $scope.search;
                    $http.get(queryUrl)
                        .then(function (response) {
                            if (response.data.length == 0) {
                                $scope.noResultFound = true;
                            }
                            $scope.searchResults = response.data;
                        }).finally(function () {
                            $scope.searchIsBusy = false;
                        });
                } else {
                    $scope.noResultFound = false;
                    $scope.searchResults = undefined;
                }

            }

            // Gets the latest entries for today's date from the DB
            function _getAllEntries() {
                diaryTracker.getEntriesForToday()
                            .then(onComplete, onError);
            }

            // Callbacks once getting latest diary entries has completed
            var onComplete = function (data) {
                angular.copy(entries, data);
            };

            var onError = function (response) {
                $scope.error = "Error retrieving current date's entries from DB";
            }

            // Utility function to select all entered characters in text box
            $scope.select = function () {
                this.setSelectionRange(0, this.value.length);
            }

            _getAllEntries();
     });

})();