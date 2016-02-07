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

        // Pulls entries from the given date from the database
        // Updates the consumedThusFar with totals
        var updateDiary = function () {
            $http.get(todayEntriesUrl)
                 .then(function (response) {

                     angular.forEach(response.data, function (dbEntry) {
                         // response.data is an array of objects 
                         // containing diary entries. Get the food details to update diary.
                         var food = dbEntry['food'];
                         for (var key in consumedThusFar) {
                             consumedThusFar[key] += food[key];
                         }
                     });                  

                 });
        };

        // Will update the above object using methods below
        var addFood = function (id, numServings) {
            // Create new entry using user's data
            var entryToAdd = {
                FoodId: id,
                NumberOfServings: numServings
            };

            $http.post(todayEntriesUrl, JSON.stringify(entryToAdd))
                        .then(function (response) {
                            updateDiary();
                            return response.data;
                        });
        };

        return {
            addFood: addFood,
            updateDiary: updateDiary,
        };
    }

    var module = angular.module("appDiary");

    // Register the service
    module.factory("diaryTracker", diaryTracker);

})();