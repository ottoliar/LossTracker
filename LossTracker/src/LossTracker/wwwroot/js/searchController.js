// searchController.js -- Search food database 
(function () {

    'use strict';

    angular.module('appDiary')
        .controller('FoodSearchCtrl', function ($scope, $http, $filter, diaryTracker) {

            var url = '/api/foods/';

            $scope.mealId = undefined;

            $scope.today = $filter('date')(new Date(), 'EEEE, MM/dd/yyyy');

            // Will hold entries pulled from the database for today's date
            $scope.breakfast = [];
            $scope.lunch = [];
            $scope.dinner = [];
            $scope.snacks = [];

            // Used when user searches the DB for food that is not there
            $scope.noResultFound = false;

            $scope.$watch('search', function (newValue, oldValue) {
                if (newValue == oldValue) return;
                _fetchFoods();
            });

            // Use diary tracker service to add a new entry on current date
            $scope.addDiaryEntry = function (foodId, numServings) {

                diaryTracker.addDiaryEntry(foodId, numServings, $scope.mealId, _getAllEntries);

                // Clear the meal after adding entry
                $scope.mealId = undefined;
            };

            // Sets which meal the next added food will be added to (Breakfast, Lunch, Dinner, Snacks)
            $scope.setMeal = function (num) {
                $scope.mealId = num;
            };

            // Utility function to select all entered characters in text box
            $scope.select = function () {
                this.setSelectionRange(0, this.value.length);
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

                $scope.loadIsBusy = true;

                diaryTracker.getEntriesForToday()
                            .then(_onComplete, _onError)
                            .finally(function () {
                                $scope.loadIsBusy = false;
                            });

            }

            // Checks current meals to ensure only one entry is included
            function _mealContains(array, entry) {
                var found = $filter('filter')(array, { id: entry['id'] }, true);
                return found.length ? true : false;
            }

            // Callbacks once getting latest diary entries has completed
            var _onComplete = function (data) {
                
                // Update the diary by placing entries in correct meal
                angular.forEach(data, function (entry) {
                    switch (entry['mealId']) {
                        case 1:
                            if (!_mealContains($scope.breakfast, entry)) 
                                $scope.breakfast.push(entry);
                            break;
                        case 2:
                            if (!_mealContains($scope.lunch, entry)) 
                                $scope.lunch.push(entry);
                            break;
                        case 3:
                            if (!_mealContains($scope.dinner, entry))
                                $scope.dinner.push(entry);
                            break;
                        case 4:
                            if (!_mealContains($scope.snacks, entry))
                                $scope.snacks.push(entry);
                            break;
                        default:
                            if (!_mealContains($scope.snacks, entry))
                                $scope.snacks.push(entry);
                    }
                });

            };

            var _onError = function (response) {
                $scope.error = "Error retrieving current date's entries from DB";
            }

            _getAllEntries();
     });

})();