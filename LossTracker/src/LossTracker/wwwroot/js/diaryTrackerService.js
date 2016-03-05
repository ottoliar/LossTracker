// diaryTracker.js -- Provide a single object representing state of food diary
(function () {

    'use strict';

    var diaryTracker = function ($http, $filter) {

        var today = $filter('date')(new Date(), 'MM-dd-yyyy'); 

        // API endpoints
        var foodApiUrl = '/api/foods/';
        var todayEntriesUrl = '/api/entries/' + today;
        var editEntryUrl = '/api/entries/';
        var deleteEntryUrl = '/api/delete/entries/';

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

        // Return the latest macro state of today's diary
        var getLatestDiaryMacros = function () {
            return consumedThusFar;
        };

        // Get all of the latest diary entries
        var getEntriesForToday = function () {
            return $http.get(todayEntriesUrl)
                  .then(function (response) {
                      return response.data;
                  });
        };

        // Pulls entries from the given date from the database
        // Updates the consumedThusFar with totals
        var syncWithDatabase = function (_callback) {
            $http.get(todayEntriesUrl)
                 .then(function (response) {
                     angular.forEach(response.data, function (dbEntry) {
                         // response.data is an array of objects 
                         // containing diary entries. Get the food details to update diary.
                         var food = dbEntry['food'];
                         var numServings = dbEntry['numberOfServings'];
                         _updateTotals(food, numServings, true);
                     });

                     _callback();
                 });
        };

        // Post a new entry to the database and update the running totals
        var addDiaryEntry = function (id, numServings, mealId, _callback) {
            // Create new entry using user's data
            var entryToAdd = {
                FoodId: id,
                NumberOfServings: numServings,
                MealId: mealId
            };

            $http.post(todayEntriesUrl, JSON.stringify(entryToAdd))
                        .then(function (response) {
                            var newEntry = response.data;
                            // Add the newly posted entry to our running totals
                            var food = newEntry['food'];
                            var numServings = newEntry['numberOfServings'];
                            // Update the running total with the newly added food
                            _updateTotals(food, numServings, true);
                            _callback(newEntry, true);
                        });
        };

        // Update entries in the database with modified versions
        var editEntry = function (entry, oldNumServings, id) {
            var numServings = entry['numberOfServings'];
            var food = entry['food'];
            var foodId = entry['foodId'];
            var modifiedEntry = {
                numberOfServings: numServings,
                FoodId: foodId
            };
            // Post edited entry to the database, then update totals
            var completeEditUrl = editEntryUrl + id;
            $http.post(completeEditUrl, JSON.stringify(modifiedEntry))
                        .then(function (response) {
                            if (numServings < oldNumServings) {
                                _updateTotals(food, oldNumServings - numServings, false);
                            } else if (numServings > oldNumServings) {
                                _updateTotals(food, numServings - oldNumServings, true);
                            }
                        });
        };

        // Delete entries from DB and their corresponding macros from our object tracker
        var deleteEntry = function (entry, id) {
            var numServings = entry['numberOfServings'];
            var food = entry['food'];
            // Remove the macros from the tracker 
            var completeDeleteUrl = deleteEntryUrl + id;
            $http.post(completeDeleteUrl)
                    .then(function (response) {
                        _updateTotals(food, numServings, false);
                    });
        };

        return {
            addDiaryEntry: addDiaryEntry,
            syncWithDatabase: syncWithDatabase,
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