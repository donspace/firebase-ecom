function CreateAdCategoryController($scope, $state, createAdFactory, ConfigurationManager) {

     /**
     * Variable Initializations
     */

     //settings page data
     $scope.categoryConfig = {}
     $scope.selectedSubCategory = null;
     var metaConfig;

     /**
      * 
      * DOM  Events
      */

     this.$onInit = function () {
          populateCategoryData();
     }

     $scope.selectSubCategory_Click = function (subCatId, subCat) {
          console.log(" CAT : ", subCat);
          createAdFactory.generateAdMetadata(subCatId,subCat)
               .then(function(){
                    $state.go("header.marginBox.createAd.details");
               }).catch(function(err){
                    alert(err);
               })

     }

     function populateCategoryData() {
          ConfigurationManager.getMetaConfig().then(function (metaConfig) {
               $scope.metaConfig = metaConfig;
               $scope.$applyAsync();
          })
     }

};

angular.module('createAd').controller('CreateAdCategoryController', [
     "$scope", "$state", "createAdFactory", "ConfigurationManager",
     CreateAdCategoryController]);