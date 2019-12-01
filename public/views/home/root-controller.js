function RootController($scope, $state) {

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

    $scope.onClickSearch=function(){
        var searchTex=$scope.searchText;
        searchTex = searchTex.replace(" ","-");
        $state.go("search",{q:searchTex});
    }

    $scope.onClickOpenOnlineStore=function(){
        $state.go("login",{path:"asdas"});
    }
    $scope.onClickPostAd=function(){
     
        $state.go("header.marginBox.createAd.selectCategory");
    }

    $scope.onClickForum=function(){
        $state.go('forum.feed');
    }

};

angular.module('app').controller('RootController', RootController);