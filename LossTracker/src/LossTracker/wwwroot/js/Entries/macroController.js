// macroController.js -- Get/Update user macros
(function () {

    'use strict';

    angular.module("appDiary")
        .controller("macroController", macroController);

    function macroController($scope, $http, diaryTracker) {

        // ViewModel
        var vm = this;

        // Get User's profile goals
        var url = "/api/profile/";
        vm.noEntries = true;

        // vm.consumed measures the total macros for user's entries
        function _updateToLatestDiary() {
            vm.consumed = diaryTracker.getLatestDiaryMacros();
        }

        // Get user's calorie/macro goals
        function _fetchProfile() {
            $http.get(url).then(function (response) {
                vm.profileMacros = response.data;
                _updateToLatestDiary();
            });
        }

        // Watch the shared service to see when new entries are added
        // Update the chart accordingly
        $scope.$watch("vm.consumed", function (newValue, oldValue) {
            if (newValue == oldValue) return;

            // Initialiaze pie chart graph with new values
            $scope.labels = ["Carbohydrate", "Protein", "Fat"];
            $scope.data = [vm.consumed.carbGrams, vm.consumed.proteinGrams, vm.consumed.fatGrams];
            $scope.colours = ["#FF851B", "#001f3f", "#FF4136"];
            $scope.options = { tooltipTemplate: "<%=label%>: <%=value%>g", animation: false };

            if (vm.consumed.calories !== 0)
                vm.noEntries = false;
            else
                vm.noEntries = true;
        }, true);

        // Get user's target macros/calories from profile
        _fetchProfile();
    }

})();
