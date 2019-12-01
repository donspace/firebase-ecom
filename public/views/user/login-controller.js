function LoginController($scope, $state, $location, UserManager) {

    $scope.uiState = "create";
    $scope.newUser = {};
    $scope.loginUser = {};
    $scope.loginFormVisibility = false;

    this.$onInit = function () {
        if (firebase.auth().currentUser) {
            conditionalNavigator();
        }
    }

    $scope.onClickExistingUser = function () {
        $scope.uiState = "login";
    }

    $scope.onClickNewUser = function () {
        $scope.uiState = "create";
    }

    $scope.onClickLogin = function () {
        UserManager.signin($scope.loginUser.username, $scope.loginUser.password)
            .then(
                response => {
                    console.log("success : ", response);
                    conditionalNavigator();
                }
            )
            .catch((err) => {
                return alert(err);
            })
    }

    $scope.onClickSignup = function () {
        UserManager.signup($scope.newUser.username, $scope.newUser.password, $scope.newUser.displayName)
            .then(
                response => conditionalNavigator()
            )
            .catch((err) => {
                return alert(err);
            }
            )
    }

    /////////FB login
    $scope.onClickFacebook = function () {
        UserManager.signinWithFacebook()
            .then(
                response => conditionalNavigator()
            ).catch((err) => {
                return alert(err);
            })
    }

    $scope.onClickGmailSignin = function () {
        UserManager.signinWithGmail()
            .then(
                response => conditionalNavigator()
            ).catch((err) => {
                return alert(err);
            })
    }

    $scope.onClickTwitterSignin = function () {
        UserManager.signinWithTwitter()
            .then(
                response => conditionalNavigator()
            ).catch((err) => {
                return alert(err);
            })
    }

    function conditionalNavigator() {
        var params = $location.search();
        switch (params.path) {
            case "forum":
                $state.go('forum');
                break;
            case "create_ad":
                $state.go('header.marginBox.createAd.selectCategory');
                break; 
            default:
                $state.go('root');
        }

    };
}

angular.module('app').controller('LoginController', LoginController);