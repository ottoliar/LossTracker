// diaryTracker.js -- Provide a single object representing state of food diary
(function () {

    'use strict';

    var diaryTracker = function ($http, $filter) {

        var today = $filter('date')(new Date(), 'MM-dd-yyyy'); 

        var foodApiUrl = '/api/foods';
        var todayEntriesUrl = '/api/entries/' + today;

        // Object representing what user has consumed so far
        var consumedThusFar = {
            calories: 0,
            carbGrams: 0,
            proteinGrams: 0,
            fatGrams: 0
        };

        // Updates totals in consumedThusFar 
        // by adding the specific values of food passed in
        function updateTotals(objToUpdate, food) {
            for (var key in objToUpdate) {
                objToUpdate[key] += food[key];
            }
        }

        // Pulls entries from the given date from the database
        // Updates the consumedThusFar with totals
        var syncWithDatabase = function () {
            $http.get(todayEntriesUrl)
                 .then(function (response) {

                     angular.forEach(response.data, function (dbEntry) {
                         // response.data is an array of objects 
                         // containing diary entries. Get the food details to update diary.
                         var food = dbEntry['food'];
                         updateTotals(consumedThusFar, food);
                     });                  

                 });
        };

        // Will update the above object using methods below
        var addDiaryEntry = function (id, numServings) {
            // Create new entry using user's data
            var entryToAdd = {
                FoodId: id,
                NumberOfServings: numServings
            };

            $http.post(todayEntriesUrl, JSON.stringify(entryToAdd))
                        .then(function (response) {
                            // Add the newly posted entry to our running totals
                            var food = response.data['food'];
                            updateTotals(consumedThusFar, food);
                            return response.data;
                        });
        };

        return {
            addDiaryEntry: addDiaryEntry,
            syncWithDatabase: syncWithDatabase
        };
    }

    var module = angular.module("appDiary");

    // Register the service
    module.factory("diaryTracker", diaryTracker);

})();