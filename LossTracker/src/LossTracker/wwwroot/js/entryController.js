// searchController.js -- Search food database & add foods to diary
(function () {

    "use strict";

    angular.module("appDiary")
        .controller("entryController", entryController);

    function entryController($scope, $http, $filter, diaryTracker) {

        // Create the ViewModel
        var vm = this;

        // Used to reach API endpoint
        var url = "/api/foods/";

        vm.today = $filter("date")(new Date(), "EEEE, MM/dd/yyyy");

        // Will hold entries pulled from the database for today's date
        vm.breakfast = [];
        vm.lunch = [];
        vm.dinner = [];
        vm.snacks = [];

        // Used when user searches the DB for food that is not there
        vm.noResultFound = false;

        $scope.$watch("search", function (newValue, oldValue) {
            if (newValue == oldValue) return;
            //vm.noResultFound = false;
            _fetchFoods();
        });

        // Use diary tracker service to add a new entry on current date
        vm.addDiaryEntry = function (foodId, numServings) {
            diaryTracker.addDiaryEntry(foodId, numServings, vm.mealId, _sortEntry);
            // Clear the meal after adding entry
            vm.mealId = undefined;
        };

        // Put the passed entry into the editor
        vm.editEntry = function (entry) {
            vm.currentEntry = entry;
        };

        // Post edited entry to the diary tracker service
        vm.postEdit = function (entryId) {
           diaryTracker.editEntry(vm.currentEntry, entryId);

            vm.currentEntry = undefined;
        };

        // Sets which meal the next added food will be added to (Breakfast, Lunch, Dinner, Snacks)
        vm.setMeal = function (meal) {
            vm.mealId = meal;
        };

        // Utility function to select all entered characters in text box
        vm.select = function () {
            this.setSelectionRange(0, this.value.length);
        }

        // Live feed results of database objects matching user query in search bar
        function _fetchFoods() {
            if (vm.searchResults === undefined || $scope.search.length !== 0) {
                vm.searchIsBusy = true;
                var queryUrl = url + $scope.search;

                $http.get(queryUrl)
                    .then(function (response) {
                        if (response.data.length == 0) {
                            vm.noResultFound = true;
                        } else {
                            vm.noResultFound = false;
                        }
                        vm.searchResults = response.data;
                    }).finally(function () {
                        vm.searchIsBusy = false;
                    });
            } else {
                vm.noResultFound = false;
                vm.searchResults = undefined;
            }
        }

        // Gets the latest entries for today's date from the DB
        function _getAllEntries() {
            vm.loadIsBusy = true;

            diaryTracker.getEntriesForToday()
                        .then(_onComplete, _onError)
                        .finally(function () {
                            vm.loadIsBusy = false;
                        });
        }


        // Callbacks once getting latest diary entries has completed
        var _onComplete = function (data) {
                // Update the diary by placing entries in correct meal
                angular.forEach(data, function (entry) {
                    _sortEntry(entry);
                });
            };

        // Places entries in their respective meals (breakfast, lunch, dinner, snacks)
        function _sortEntry(entry) {
            switch (entry["mealId"]) {
                case 1:
                    vm.breakfast.push(entry);
                    break;
                case 2:
                    vm.lunch.push(entry);
                    break;
                case 3:
                    vm.dinner.push(entry);
                    break;
                case 4:
                    vm.snacks.push(entry);
                    break;
                default:
                    vm.snacks.push(entry);
            }
        };

        var _onError = function (response) {
            vm.error = "Error retrieving current date's entries from DB";
        }

        // Get latest diary entries for this particular day on page load
        _getAllEntries();

    }

})();