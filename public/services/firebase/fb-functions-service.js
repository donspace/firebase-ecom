function FBFunctionsService() {

    var functions = firebase.functions();

    return {
        searchAdvertisementBySearchText: function (searchText) {

            var mainSearch = firebase.functions().httpsCallable('search-mainSearch');

            return mainSearch({ searchText: searchText })
                .then(function (result) {
                    // Read result of the Cloud Function.
                    var searchResults = result.data;
                    console.log("Function reply", searchResults);

                    return result;
                });
        },
        createAd:function(advertisementObject){
            var createAd = firebase.functions().httpsCallable('ad-createAd');

            return createAd({ advertisementObject: advertisementObject });
        }
    }
}

angular.module('firebaseCustomModules').service('FBFunctionsService', FBFunctionsService);