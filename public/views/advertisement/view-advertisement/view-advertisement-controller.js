function ViewAdvertisementController($scope, $state,$stateParams,HelperFunctions,AdvertisementManager) {

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

    this.$onInit = function () {
        $scope.advertisement = null;
        loadAdvertisement($stateParams.publicReference);
    }

    function loadAdvertisement(publicReference) {
        AdvertisementManager.getAdvertisementByPublicReference(publicReference)
            .then(function (result) {
                setAdvertisementValues(result);
            }).then(function () {
                $scope.$applyAsync();
            }).catch(function (error) {
                console.log("ERROR :", error);
            })
    }

    function setAdvertisementValues(result) {
        
        $scope.advertisement =HelperFunctions.setImagePaths([result])[0];
        $scope.slides=$scope.advertisement.imageReferences;
        $scope.$applyAsync();
    }

    $scope.swipeLeft=function(){
        console.log('swiped left');
    }  

};

angular.module('viewAdd', []).controller('ViewAdvertisementController', 
'$scope', '$state','$stateParams','HelperFunctions','AdvertisementManager',
ViewAdvertisementController);