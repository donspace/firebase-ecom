function ForumController($scope,$state) {

    console.log("forum controller");

    $scope.goToTab=function(tabState){
        $state.go(tabState);
    }
    

};

angular.module('forum',[]).controller('ForumController', ForumController);