angular.module('userAuth', [])

    .directive('signUp', function () {

        var controller = function ($scope,UserManager) {
            console.log("signup directive hit");
            $scope.val=true;
            $scope.newUser = {};
            $scope.loginUser = {};
            $scope.loginFormVisibility=false;

            $scope.loginClick=function(){
                UserManager.signin($scope.loginUser.username,$scope.loginUser.password)
                .then(
                    response => console.log("success : ",response)
                )
                .catch(
                    err => console.log("error : ",err)
                )
            }

            $scope.signupClick=function(){
                UserManager.signup($scope.newUser.username,$scope.newUser.password,$scope.newUser.displayName)
                .then(
                    response => console.log("success : ",response)
                )
                .catch(
                    err => console.log("error : ",err)
                )
            }

            $scope.showLogin=function(){
                $scope.loginFormVisibility=true;
            }

            $scope.showSignup=function(){
                $scope.loginFormVisibility=false;
            }

        };


        return {
            restrict: 'EA', //Default in 1.3+
            scope: {
                datasource: '=',
                add: '&',
            },
            templateUrl: "views/directives/signup-directive/signup-template.html",
            controller: controller

        };
    });