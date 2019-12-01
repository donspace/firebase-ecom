angular.module('dashboard')

    .directive('searchItem', function () {

        return {
            restrict: 'E', //Default in 1.3+
            templateUrl: "views/directives/search-item-directive/search-item.html"
        };
    });