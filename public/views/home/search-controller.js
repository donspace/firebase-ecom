function SearchController($scope, $state,ConfigConstant,HelperFunctions,AdvertisementManager) {

    $scope.isLogged = false;

    firebase.auth().onAuthStateChanged(firebaseUser => {
        console.log("user logged status : ", firebaseUser)
        if (firebaseUser) {
            $scope.isLogged = true;
        } else {
            $scope.isLogged = false;
        }
        $scope.$applyAsync();
    })

    this.$onInit = function () {
        $scope.searchResults = null;
        if ($state.params.q) {
            $scope.searchText = $state.params.q;
            search($scope.searchText);
        }
    }

    $scope.onClickItem = function (item) {
        item.publicReference
        $state.go('viewAd', { publicReference: item.publicReference })
    }

    function search(searchText) {
        AdvertisementManager.searchAdvertisementBySearchText(searchText)
            .then(function (searchResult) {
                console.log("Search Results :", searchResult);
                $scope.searchResults = HelperFunctions.setImagePaths(searchResult.data);
                $scope.$applyAsync();
            }).catch(function (error) {
                console.log("Search Error :", error);
                $scope.$applyAsync();
            })
    }

};

angular.module('app').controller('SearchController', 
'$scope', '$state','ConfigConstant','HelperFunctions','AdvertisementManager',
SearchController);