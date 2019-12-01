function HomeController($scope,$state) {

    $scope.isLogged=false;

    firebase.auth().onAuthStateChanged(firebaseUser =>{
        console.log("user logged status : ",firebaseUser)
        if(firebaseUser){
            $scope.isLogged=true;
        }else{
            $scope.isLogged=false;
        }
        $scope.$applyAsync();
    })
    

};

angular.module('app').controller('HomeController', HomeController);