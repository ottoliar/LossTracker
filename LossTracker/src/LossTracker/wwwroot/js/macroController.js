// macroController.js -- Get/Update user macros
(function () {

    "use strict";

    angular.module("appDiary")
        .controller("macroController", macroController);

    function macroController($scope, $http, diaryTracker) {

        // Get latest calories/macronutrient totals from database
        diaryTracker.syncWithDatabase(_updateToLatestDiary);
        var vm = this;

        // Get User's profile goals
        var url = "/api/profile";
        vm.noEntries = true;

        function _updateToLatestDiary() {
            vm.consumed = diaryTracker.getLatestDiaryMacros();
        }

        function _fetchProfile() {
            $http.get(url).then(function (response) {
                vm.profileMacros = response.data;
            });
        }

        // Watch the shared service to see when new entries are added
        // Update the chart accordingly
        $scope.$watch("vm.consumed", function (newValue, oldValue) {
            if (newValue == oldValue) return;

            // Initialiaze pie chart graph
            $scope.labels = ["Carbohydrates", "Protein", "Fats"];
            $scope.data = [vm.consumed.carbGrams, vm.consumed.proteinGrams, vm.consumed.fatGrams];
            $scope.colours = ["#FF851B", "#001f3f", "#FF4136"];
            $scope.options = { tooltipTemplate: "<%=label%>: <%=value%>g" };

            if (vm.consumed.calories !== 0)
                vm.noEntries = false;
            else
                vm.noEntries = true;
        }, true);

        // Get user's target macros/calories from profile
        _fetchProfile();
    }

})();
