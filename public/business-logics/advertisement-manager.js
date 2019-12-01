function AdvertisementManager(DOSpacesService, FBFunctionsService, HelperFunctions, FBFirestoreService) {

    function updateAdImages(imageFileList, imageReferences) {

        var promiseList = [];

        for (var i = 0; i < imageFileList.length; i++) {

            promiseList.push(new Promise(function (resolve, reject) {
                return DOSpacesService.insertAdvertisementImage(imageFileList[i], imageReferences[i])
                    .then(function (result) {
                        resolve(result);
                    }).catch(function (err) {
                        reject(err);
                    })
            }))
        }

        return Promise.all(promiseList);
    }

    return {

        testFunc: function () {
            console.log("AWS OBJECT 2", AWS);
            return;
        },
        searchAdvertisementBySearchText: function (searchText) {
            return FBFunctionsService.searchAdvertisementBySearchText(searchText);
        },
        getAdvertisementByPublicReference: function (publicReference) {

            return FBFirestoreService.getDocumentsByProperty("advertisements", "publicReference", "==", publicReference);
        },
        createAdvertisement: function (advertisementObject, imageFileList) {

            var fileList = imageFileList;

            advertisementObject.publicReference = HelperFunctions.generatePublicReferenceForAdvertisement(advertisementObject);
            advertisementObject.imageReferences = HelperFunctions.generateFolderNameByPublicReference(advertisementObject.publicReference, imageFileList.length);

            return FBFunctionsService.createAd(advertisementObject)
                .then(function (result) {
                    console.log("advertisement posted");
                    return updateAdImages(fileList, advertisementObject.imageReferences)
                        .then(function (result) {
                            return advertisementObject.publicReference;
                        });

                }).catch(function (error) {
                    console.log("ManagerError ", error)
                });

        },
        updateAdImages: function (imageFileList, imageReference) {
            return updateAdImages(imageFileList, imageReference);
        },
        getAdvertisementPropertiesById: function (idList) {

            if (!idList) {
                return new Promise(function (resolve, reject) { resolve(null) });
            }

            return FBFirestoreService.getAdvertisementPropertiesById(idList);
        }

    }
}

angular.module('BusinessManager', []).factory('AdvertisementManager', [
    'DOSpacesService', 'FBFunctionsService', 'HelperFunctions', 'FBFirestoreService',
    AdvertisementManager]);