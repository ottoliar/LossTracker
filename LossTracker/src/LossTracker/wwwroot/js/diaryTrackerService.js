// diaryTracker.js -- Provide a single object representing state of food diary
(function () {

    'use strict';

    var diaryTracker = function ($http, $filter) {

        var today = $filter('date')(new Date(), 'MM-dd-yyyy');

        // API endpoints
        var foodApiUrl = '/api/foods/';
        var todayEntriesUrl = '/api/entries/' + today;
        var editEntryUrl = '/api/entries/edit/';
        var deleteEntryUrl = '/api/entries/delete/';
        var getSingleEntryUrl = '/api/entries/getentry/';

        // Entries sorted into these buckets based on their mealId
        var breakfast = [];
        var lunch = [];
        var dinner = [];
        var snacks = [];

        // Object representing what user has consumed so far
        var consumedThusFar = {
            calories: 0,
            carbGrams: 0,
            proteinGrams: 0,
            fatGrams: 0
        };

        // Updates totals in consumedThusFar 
        // by adding the specific values of food passed in 
        function _updateTotals(food, numServings, add) {
            if (add === true) {
                for (var key in consumedThusFar) {
                    consumedThusFar[key] += (food[key]*numServings);
                }
            } else {
                for (var key in consumedThusFar) {
                    consumedThusFar[key] -= (food[key]*numServings);
                }
            }
        }

        // Checking meals to ensure no duplicates are added
        function _isInArray(array, entry, toDelete) {
            for (var i = 0; i < array.length; i++) {
                var currentEntry = array[i];
                // Option to remove entry from the array, or simply check if it exists
                if (currentEntry.id === entry.id) {
                    if (toDelete) {
                        array.splice(i, 1);
                    } else {
                        return true;
                    }
                }
            }
            return false;
        }

        // Places an entry in it's proper meal bin
        // toDelete -- Set to true when want to delete that entry from a meal
        // add -- Set to true when we want to sum the macros, false to subtract
        function _sortEntry(entry, toDelete, add) {
            var food = entry.food;
            var numberOfServings = entry.numberOfServings;
            switch (entry.mealId) {
                case 1:
                    if (!_isInArray(breakfast, entry, toDelete)) {
                        breakfast.push(entry);
                        _updateTotals(food, numberOfServings, add);
                    }
                    break;
                case 2:
                    if (!_isInArray(lunch, entry, toDelete)) {
                        lunch.push(entry);
                        _updateTotals(food, numberOfServings, add);
                    }
                    break;
                case 3:
                    if (!_isInArray(dinner, entry, toDelete)) {
                        dinner.push(entry);
                        _updateTotals(food, numberOfServings, add);
                    }
                    break;
                case 4:
                    if (!_isInArray(snacks, entry, toDelete)) {
                        snacks.push(entry);
                        _updateTotals(food, numberOfServings, add);
                    }
                    break;
                case 5:
                    if (!_isInArray(snacks, entry, toDelete)) {
                        snacks.push(entry);
                        _updateTotals(food, numberOfServings, add);
                    }
            }
        }

        // Get all of the latest diary entries & place them in their respective meals
        var getEntriesForToday = function () {
            return $http.get(todayEntriesUrl)
                  .then(function (response) {
                      angular.forEach(response.data, function (entry) {
                          // Add the entries to running totals
                          _sortEntry(entry, false, true);
                      });
                      //return response.data;
                  });
        };

        // Get a single entry from the database
        var getSingleEntry = function (id) {
            var completeGetUrl = getSingleEntryUrl + id;
            return $http.get(completeGetUrl)
                .then(function (response) {
                    return response.data;
                });
        }

        // Pulls entries from the given date from the database
        // Updates the consumedThusFar with totals
        /*var syncWithDatabase = function (_callback) {
            $http.get(todayEntriesUrl)
                 .then(function (response) {
                     angular.forEach(response.data, function (dbEntry) {
                         // response.data is an array of objects 
                         // containing diary entries. Get the food details to update diary.
                         var food = dbEntry.food;
                         var numServings = dbEntry.numberOfServings;
                         _updateTotals(food, numServings, true);
                     });

                     _callback();
                 });
        };*/

        // Post a new entry to the database and update the running totals
        var addDiaryEntry = function (id, numServings, mealId) {
            // Create new entry using user's data
            var entryToAdd = {
                FoodId: id,
                NumberOfServings: numServings,
                MealId: mealId
            };
            return $http.post(todayEntriesUrl, JSON.stringify(entryToAdd))
                        .then(function (response) {
                            var newEntry = response.data;
                            // Add the newly posted entry to our running totals
                            _sortEntry(newEntry, false, true);
                        });
        };

        // Update entries in the database with modified versions
        var editEntry = function (entry, oldNumServings, newNumServings) {
            var food = entry.food;
            var foodId = entry.foodId;
            var mealId = entry.mealId;
            var modifiedEntry = {
                mealId: mealId,
                numberOfServings: newNumServings,
                FoodId: foodId
            };
            // Post edited entry to the database, then update totals
            var completeEditUrl = editEntryUrl + entry.id;
            return $http.post(completeEditUrl, JSON.stringify(modifiedEntry), {
                             headers: {
                                    'Content-Type': 'application/json'
                             }
                        })
                        .then(function (response) {
                            if (newNumServings < oldNumServings) {
                                _updateTotals(food, oldNumServings - newNumServings, false);
                            } else if (newNumServings > oldNumServings) {
                                _updateTotals(food, newNumServings - oldNumServings, true);
                            }

                            function _updateEntry(meal, entry) {
                                for (var i = 0; i < meal.length; i++) {
                                    var currentEntry = meal[i];
                                    if (currentEntry.id === entry.id) {
                                        currentEntry.numberOfServings = newNumServings;
                                        return;
                                    }
                                }
                            }
                            switch (mealId) {
                                case 1:
                                    _updateEntry(breakfast, entry);
                                    break;
                                case 2:
                                    _updateEntry(lunch, entry);
                                    break;
                                case 3:
                                    _updateEntry(dinner, entry);
                                    break;
                                case 4:
                                    _updateEntry(snacks, entry);
                                    break;
                                default:
                                    _updateEntry(snacks, entry);
                            }
                        });
        };

        // Delete entries from DB and their corresponding macros from our object tracker
        var deleteEntry = function (entry) {
            var numServings = entry.numberOfServings;
            var food = entry.food;
            // Remove the macros from the tracker 
            var completeDeleteUrl = deleteEntryUrl + entry.id;
            $http.post(completeDeleteUrl)
                    .then(function (response) {
                        // Remove the entry from the array
                        _sortEntry(entry, true, false);
                        // Subtract the macros from the counter
                        _updateTotals(food, numServings, false);
                    });
        };

        // Return the latest macro state of today's diary
        var getLatestDiaryMacros = function () {
            return consumedThusFar;
        };

        // Return arrays containing the sorted entries
        var getBreakfastEntries = function () {
            return breakfast;
        };

        var getLunchEntries = function () {
            return lunch;
        };

        var getDinnerEntries = function () {
            return dinner;
        };

        var getSnackEntries = function () {
            return snacks;
        };

        return {
            getBreakfastEntries: getBreakfastEntries,
            getLunchEntries: getLunchEntries,
            getDinnerEntries: getDinnerEntries,
            getSnackEntries: getSnackEntries,
            addDiaryEntry: addDiaryEntry,
            //syncWithDatabase: syncWithDatabase,
            getSingleEntry: getSingleEntry,
            getLatestDiaryMacros: getLatestDiaryMacros,
            getEntriesForToday: getEntriesForToday,
            editEntry: editEntry,
            deleteEntry: deleteEntry
        };
    }

    var module = angular.module("appDiary");

    // Register the service
    module.factory("diaryTracker", diaryTracker);

})();