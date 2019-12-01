angular.module('dashboard')

.directive('searchHeaderBar', function () {

    return {
        restrict: 'E', //Default in 1.3+
        templateUrl:"views/directives/header-bar-directive/search-header-bar-template.html"
    };
});