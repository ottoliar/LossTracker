// entryController.js -- Display today's entries 
(function () {

    "use strict";

    angular.module("appDiary")
        .controller("entryController", entryController);

    function entryController($scope, $http, $filter, diaryTracker) {

        // Create the ViewModel
        var vm = this;

        vm.today = $filter("date")(new Date(), "EEEE, MM/dd/yyyy");

        function _getAllEntries() {
            vm.loadIsBusy = true;
            diaryTracker.getEntriesForToday()
                        .then(_onComplete, _onError)
                        .finally(function () {
                            vm.loadIsBusy = false;
                        })
        };

        var _onComplete = function () {
            vm.breakfast = diaryTracker.getBreakfastEntries();
            vm.lunch = diaryTracker.getLunchEntries();
            vm.dinner = diaryTracker.getDinnerEntries();
            vm.snacks = diaryTracker.getSnackEntries();
        };

        var _onError = function () {
            vm.error = "Error retrieving entries from database";
        };

        /*$scope.$watch("vm.breakfast", function (newValue, oldValue) {
            if (newValue == oldValue) return;
            console.log("newvalue: " + newValue);
            console.log("oldValue: " + oldValue);
        });*/

        // Gets the latest entries for today's date from the DB
       /* function _getAllEntries() {
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

        var _onError = function (response) {
            vm.error = "Error retrieving current date's entries from DB";
        };

        // Add only entries not present in current array (check for duplicates)
        function _addToMeal(meal, entry) {
            var entryDeleted = false;
            for (var i = 0; i < meal.length; i++) {
                var currentEntry = meal[i];
                console.log("current entry: " + currentEntry);
                if (currentEntry.id === entry.id) {
                    meal.splice(i, 1);
                    entryDeleted = true;
                    break;
                }
            }
            if (!entryDeleted) {
                console.log("pushing entry");
                meal.push(entry);
            }
        }

        // Places or deletes entries to/from their respective meals (breakfast, lunch, dinner, snacks)
        // Search existing array to ensure they are not there already
        function _sortEntry(entry) {
            console.log("entry being sorted: ");
            for (var key in entry) {
                console.log("key: " + key);
                console.log("value: " + entry[key]);
            }
            switch (entry.mealId) {
                case 1:
                    _addToMeal(vm.breakfast, entry);
                    break;
                case 2:
                    _addToMeal(vm.lunch, entry);
                    break;
                case 3:
                    _addToMeal(vm.dinner, entry);
                    break;
                case 4:
                    _addToMeal(vm.snacks, entry);
                    break;
                default:
                    addToMeal(vm.snacks, entry);
            }
        };*/

        // Get latest diary entries for this particular day on page load
        _getAllEntries();

    }

})();