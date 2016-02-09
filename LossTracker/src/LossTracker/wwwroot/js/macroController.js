// macroController.js -- Get/Update user macros
(function () {

    'use strict';

    angular.module('appDiary')
            .controller('MacroController', function ($scope, $http, diaryTracker) {

                // Get latest totals from the database
                diaryTracker.syncWithDatabase(updateToLatestDiary);
                var url = '/api/profile/';

                function fetchProfile() {
                    $http.get(url).then(function(response) {
                        $scope.profileMacros = response.data;
                    });
                }

                function updateToLatestDiary() {
                    $scope.consumed = diaryTracker.getLatestDiaryMacros();
                }

                fetchProfile();
            });

})();
