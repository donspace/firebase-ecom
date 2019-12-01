function BusinessPageController($scope, $state,$stateParams, PostAddConstant) {

    /**
    * Variable Initializations
    */

    //settings page data
    //$scope.profileSettings={}

    /**
     * 
     * DOM  Events
     */
    var carousels = bulmaCarousel.attach();
    console.log("biz page")
    this.$onInit = function () {
        // $scope.advertisement = null;
        // loadAdvertisement($stateParams.publicReference);
    }


};

angular.module('bizPage', []).controller('BusinessPageController', BusinessPageController);