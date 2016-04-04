// profileController.js -- Responsible for updating user's profile
(function () {

    'use strict';

    angular.module("appProfile")
            .controller("profileController", profileController);

    function profileController($http, $alert) {

        // ViewModel
        var vm = this;
        vm.loadIsBusy = true;

        // Set form to be disabled until user modifies contents
        vm.disabled = true;

        // Profile api endpoint
        var profileApiUrl = "/api/profile";

        // Alert to be shown when profile is successfully updated
        vm.alertEditSuccess = $alert({
            title: "Edit Successful!",
            content: "Profile was successfully edited.",
            placement: "top-right",
            type: "success",
            duration: 3,
            dismissable: true,
            show: false
        });

        function _setProfile(response) {
            vm.userProfile = {
                calorieGoal: response.data.calorieGoal,
                proteinGoal: response.data.proteinGoal,
                carbGoal: response.data.carbGoal,
                fatGoal: response.data.fatGoal
            };
        }

        // Get the user's current profile and display it to the user
        function _fetchProfile() {
            vm.loadIsBusy = true;
            $http.get(profileApiUrl)
                 .then(function (response) {
                     _setProfile(response);
                 })
                 .finally(function () {
                     vm.loadIsBusy = false;
                 });
        }

        // Post updated profile to the database and notify user of success
        vm.modifyProfile = function () {
            vm.loadIsBusy = true;
            $http.post(profileApiUrl, JSON.stringify(vm.userProfile))
                .then(function (response) {
                    _setProfile(response);
                })
                .finally(function () {
                    vm.alertEditSuccess.show();
                    vm.disabled = true;
                    vm.loadIsBusy = false;
                });
        };

        vm.click = function () {
            vm.disabled = false;
        };

        _fetchProfile();

    }

})();