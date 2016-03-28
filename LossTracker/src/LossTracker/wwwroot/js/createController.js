// createController.js -- Used for creating new foods to be added to the database
(function () {

    'use strict';

    angular.module("appDiary")
        .controller("createController", createController);

    function createController($alert, $location, diaryTracker) {

        var vm = this;

        // Alert for successful creation of Food
        vm.alertCreationSuccess = $alert({
            title: "Food creation successful!",
            content: "Food was added to the database",
            placement: "top-right",
            type: "success",
            duration: 3,
            dismissable: true,
            show: false
        });

        vm.alertCreationAddSuccess = $alert({
            title: "Food creation successful!",
            content: "Food was created & added to your diary",
            placement: "top-right",
            type: "success",
            duration: 3,
            dismissable: true,
            show: false
        });

        // Defaults for the new food to be created
        vm.newFood = {
            description: null,
            servingSize: null,
            sizeUnit: "grams",
            calories: null,
            proteinGrams: null,
            carbGrams: null,
            fatGrams: null           
        };

        // Optional settings in case user chooses to add the new item to diary
        vm.optional = {
            servings: null,
            meal: "breakfast"
        };

        // Create the new food through the API and then optionally add it to the diary
        vm.createFood = function () {
            if (vm.newFood.sizeUnit == "oz")
                // Convert oz to grams for save to the database
                vm.newFood.servingSizeInGrams = vm.newFood.servingSize * 28;
            else
                vm.newFood.servingSizeInGrams = vm.newFood.servingSize;

            if (vm.optional.servings === null) {
                diaryTracker.createFood(vm.newFood, null)
                            .finally(function () {
                                vm.alertCreationSuccess.show();
                                $location.path("/");
                            });
            } else {
                diaryTracker.createFood(vm.newFood, vm.optional)
                            .finally(function () {
                                vm.alertCreationAddSuccess.show();
                                $location.path("/");
                            });
            }
        }

    }

})();