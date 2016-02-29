// macroController.js -- Get/Update user macros
(function () {

    "use strict";

    angular.module("appDiary")
        .controller("macroController", macroController);

    function macroController($scope, $http, diaryTracker) {

        // Get latest calories/macronutrient totals from database
        diaryTracker.syncWithDatabase(_updateToLatestDiary);
        var vm = this;

        var url = "/api/profile";

        function _updateToLatestDiary() {
            vm.consumed = diaryTracker.getLatestDiaryMacros();
        }

        function _fetchProfile() {
            $http.get(url).then(function (response) {
                vm.profileMacros = response.data;
            });
        }

        $scope.$watch("vm.consumed", function (newValue, oldValue) {
            if (newValue == oldValue) {
                $scope.labels = ["Carbohydrates", "Protein", "Fats"];
                $scope.data = [0, 0, 0];
                $scope.colours = ["#FF851B", "#001f3f", "#FF4136"]
            } else {
                $scope.labels = ["Carbohydrates", "Protein", "Fats"];
                $scope.data = [vm.consumed.carbGrams, vm.consumed.proteinGrams, vm.consumed.fatGrams];
                $scope.colours = ["#FF851B", "#001f3f", "#FF4136"]
            }           
        }, true);

        // Get user's target macros/calories from profile
        _fetchProfile();
    }

})();
