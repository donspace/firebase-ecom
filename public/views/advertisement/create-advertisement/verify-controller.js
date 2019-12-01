function CreateAdVerifyController($scope, $state,createAdFactory, AdvertisementManager, HelperFunctions) {

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
        $scope.imageFileList =createAdFactory.getImageFileList();
        console.log($scope.advertisement);
        $scope.adImages=[];
        $scope.localImageSrcs = [];
    }

    // $scope.$watch('advertisement.location', function (newValue, oldValue) {
    //     PostAddConstant = $scope.advertisement;
    //     console.log("Post add const : ", PostAddConstant);
    // })


    $scope.verifyAdvertisement_Click = function () {

        console.log($scope.advertisement);
        AdvertisementManager.createAdvertisement($scope.advertisement, $scope.imageFileList)
            .then(function (result) {
                $state.go('viewAd', { publicReference: result })
                alert("Succesfully Posted");
            }).catch(function (eror) {
                alert("Error Creating the doc");
            })
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

angular.module('createAd').controller('CreateAdVerifyController', [
    "$scope", "$state","createAdFactory", "AdvertisementManager", "HelperFunctions",
    CreateAdVerifyController]);