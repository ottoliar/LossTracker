// entry.js -- Directive returning a view for food entries
(function () {

    'use strict';

    // Return entry html when <div entry></div> tags used
    angular.module('entry', [])
            .directive('entry', entry);

    function entry() {

        return {
            restrict: 'A',
            replace: true,
            templateUrl: '/views/Entries/diaryIndexEntry.html'
        };

    }


})();