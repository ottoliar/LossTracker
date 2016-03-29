// macro.js -- Directive returning a view for entries
(function () {

    'use strict';

    // Return macro html when <div macro></div> tags used
    angular.module('macro', [])
            .directive('macro', macro);

    function macro() {

        return {
            restrict: 'A',
            replace: true,
            templateUrl: '/views/Entries/diaryIndexMacro.html'
        };

    }


})();