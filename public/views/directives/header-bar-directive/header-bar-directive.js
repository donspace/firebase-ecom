angular.module('dashboard')

.directive('headerBar', function () {

    var controller = function ($scope,$state,UserManager) {

        $scope.logoutClick=function(){
            UserManager.logout()
            .then(
                response => console.log("user logged out : ",response)
            )
            .catch(
                err => console.log("logout error : ",err)
            )
        }

        $scope.profileClick=function(){
            $state.go("postLogin.marginBox.settings.profile");
        }

        $scope.logoutClick=function(){
            UserManager.logout()
            .then(
                response => $state.go("home")
            )
            .catch(
                err => console.log("logout error : ",err)
            )
        }
        
    };

    return {
        restrict: 'E', //Default in 1.3+
        scope: {
            status: '=status'
        },
        templateUrl:"views/directives/header-bar-directive/header-bar-template.html",
        controller:controller
    };
});
