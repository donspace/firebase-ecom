angular.module('dashboard')

    .directive('dynamicModal', function () {

        var controller = function ($scope,UserManager) {

            $scope.hideModal=function(){
                $scope.$parent.dmpwverifyVisibility=false;
            }
            
        };


        return {
            restrict: 'EA', //Default in 1.3+
            scope: {
                datasource: '=datasource',
                func:'=func'
            },
            templateUrl: "views/directives/dynamic-modal-directive/dm-pwverify.html",
            controller:controller

        };
    });