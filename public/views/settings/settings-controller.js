function SettingsController($scope, $state,UserManager) {

    /**
    * Variable Initializations
    */
    $scope.isLocked = true;
    var lastRecievedSettingsObject = null;
    $scope.dmpwverifyVisibility = false;
    $scope.isSaveDisabled = true;

    //settings page data
    $scope.profileSettings = {}


    /**
     * 
     * DOM  Events
     */

    this.$onInit = function () {
        loadUserData(false);
    }


    $scope.onClickEdit = function () {
        $scope.isLocked = false;
    }
    $scope.onClickCancel = function () {
        $scope.isLocked = true;
    }

    $scope.showModal = function () {
        console.log("hi");
        $scope.dmpwverifyVisibility = true;
    }
    $scope.hideModal = function () {
        $scope.dmpwverifyVisibility = false;
    }

    $scope.verifyByPassword = function (pw) {
        console.log("Sent to verification")
        UserManager.updateUserData($scope.profileSettings)
            .then(function (result) {
                loadUserData(true);
            })
    }

    /***
     * Functions
     */

    function loadUserData(isReload) {
        if (!isReload) {
            $scope.profileSettings = Lockr.get('userProfile');
            return 0;
        }

        UserManager.getUserProfileData().then(function (doc) {
            if (doc.exists) {
                $scope.profileSettings = Lockr.get('userProfile');
            } else {
                // doc.data() will be undefined in this case
                alert("No such document!");
            }

        }).then(function () {
            $scope.$applyAsync();
            $scope.$watch('profileSettings', enableSaveButton);

        }).catch(function (error) {
            console.log("Error getting document:", error);
            $scope.$applyAsync();
        });
    }

    function enableSaveButton() {
        console.log("Save enabled");
        $scope.isSaveDisabled = false;
    }

};

angular.module('settings', []).controller('SettingsController', SettingsController);