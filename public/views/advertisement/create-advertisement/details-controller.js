function CreateAdDetailsController($scope, $state,createAdFactory, AdvertisementManager, HelperFunctions) {

    /**
    * Variable Initializations
    */

    //settings page data
    //$scope.profileSettings={}

    /**
     * 
     * DOM  Events
     */

    this.$onInit = function () {
        $scope.advertisement = createAdFactory.getAdvertisement();
        $scope.adMetadata=createAdFactory.getAdMetadata();
        console.log($scope.advertisement);
        $scope.adImages=[];
        $scope.localImageSrcs = [];
    }

    // $scope.$watch('advertisement.location', function (newValue, oldValue) {
    //     PostAddConstant = $scope.advertisement;
    //     console.log("Post add const : ", PostAddConstant);
    // })


    $scope.postAdvertisement_Click = function (advertisement,fileList) {

        console.log($scope.advertisement);
        createAdFactory.setImageFileList(fileList);
        createAdFactory.setAd($scope.advertisement);
        $state.go('header.marginBox.createAd.verification');
    };

    $scope.$watch('adImages', function (newValue, oldValue) {
        changeUploadImageFile($scope.adImages);
    })

    function changeUploadImageFile(fileList) {

        //to show uploading images on browser before upload
        var readerList = [];
        for (var i = 0; i < fileList.length; i++) {

            readerList[i] = new FileReader();
            fileList[i].isEdited = true;

            readerList[i].onload = function (loadedFile) {
                if (i == 0) {
                    $scope.localImageSrcs = [];
                }
                $scope.localImageSrcs.push(loadedFile.target.result);
                $scope.$applyAsync();

            };

            readerList[i].readAsDataURL(fileList[i]);
        }
    }
};

angular.module('createAd').controller('CreateAdDetailsController', [
    "$scope", "$state","createAdFactory", "AdvertisementManager", "HelperFunctions",
    CreateAdDetailsController]);