angular.module('dashboard')

.directive('clickableItem', function () {

    function link(scope, element, attrs){

        element.on('click', function() {
            element.addClass('clickable-item-click');
        });

        element.on('click', function() {
            element.addClass('clickable-item-click');
        });

        element.on('blur',function(){
            console.log("Works")
            element.removeClass('clickable-item-click');
        })
    }

    return {
        link: link
    };
});
