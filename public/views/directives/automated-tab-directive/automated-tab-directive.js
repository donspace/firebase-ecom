angular.module('dashboard')

    .directive('automatedTab', function () {

        var controller = function (scope) {
            
            console.log(scope.datasource);
            scope.selectedCategoryIndex=0;

            scope.selectedSubcategory=null;

            scope.selectCategory_Click=function(catId){
                scope.selectedCategoryId=catId;
            }

            scope.selectSubCategory_Click=function(subcategory,i){
                scope.$parent.selectSubCategory_Click(subcategory,i,scope.selectedCategoryIndex);
            }
            
        };


        return {
            restrict: 'EA', //Default in 1.3+
            scope: {
                datasource: '=datasource',
                func:'=func'
            },
            templateUrl: "views/directives/automated-tab-directive/automated-tab-template.html",
            link:controller

        };
    });