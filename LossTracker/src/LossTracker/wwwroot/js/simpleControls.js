// simpleControls.js
(function () {

    'use strict';

    angular.module('simpleControls', [])
            .directive('waitCursor', waitCursor);

    function waitCursor() {
        
        return {
            templateUrl: '/views/waitCursor.html'
        };
    }

})();