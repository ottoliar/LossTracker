// macroController.js -- Get/Update user macros
(function () {

    'use strict';

    angular.module('appDiary')
            .controller('MacroController', function($scope, $http, diaryTracker) {

                var url = '/api/profile/';

                function fetchProfile() {
                    $http.get(url).then(function(response) {
                        $scope.profileMacros = response.data;
                    });
                }

                fetchProfile();
                diaryTracker.updateDiary();
            });

})();
