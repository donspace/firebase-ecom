angular.module('dashboard', [])

    .directive('compactDashboard', function () {

        var controller = function ($scope,UserManager) {

            $scope.logoutClick=function(){
                UserManager.logout()
                .then(
                    response => console.log("user logged out : ",response)
                )
                .catch(
                    err => console.log("logout error : ",err)
                )
            }
            
        };


        return {
            restrict: 'EA', //Default in 1.3+
            scope: {
                datasource: '=',
                add: '&',
            },
            templateUrl: "views/directives/compact-dashboard-directive/compact-dashboard-template.html",
            controller: controller

        };
    });