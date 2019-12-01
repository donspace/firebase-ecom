var myApp = angular.module('dashboard');

myApp.directive('googleMapAutocomplete',[ function() {
    return {
        require: 'ngModel',
        scope: {
            ngModel: '=',
            details: '=?'
        },
        link: function(scope, element, attrs, model) {
            var options = {
                types: ["(regions)"],
                componentRestrictions: {country: "lk"}
            };

            // var options = {
            //     types: ['(cities)'],
            //     componentRestrictions: {}
            // };

            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                var geoComponents = scope.gPlace.getPlace();
                var latitude = geoComponents.geometry.location.lat();
                var longitude = geoComponents.geometry.location.lng();
                var addressComponents = geoComponents.address_components;

                addressComponents = addressComponents.filter(function(component){

                    return true;

                    // switch (component.types[0]) {
                    //     case "locality": // city
                    //         return true;
                    //     case "administrative_area_level_1": // state
                    //         return true;
                    //     case "country": // country
                    //         return true;
                    //     default:
                    //         return true;
                    // }

                }).map(function(obj) {
                    return obj.long_name;
                });

                

                addressComponents.push(latitude, longitude);

                scope.$apply(function() {
                    var len_ac=addressComponents.length;
                    var locationObject={
                        latitude:addressComponents[len_ac-1],
                        longitude:addressComponents[len_ac-2],
                        country:addressComponents[len_ac-3],
                        province:(len_ac>3)?addressComponents[len_ac-4]:null ,
                        state:(len_ac>4)?addressComponents[len_ac-5]:null,
                        city:(len_ac>5)?addressComponents[len_ac-6]:null,
                        area:(len_ac>6)?addressComponents[len_ac-7]:(len_ac>5)?addressComponents[len_ac-6]:null
                    }
                    // console.log("locObj : ",locationObject);
                    // console.log("original : ",addressComponents);
                    scope.details = locationObject; // array containing each location component
                    model.$setViewValue(element.val());
                });
            });
        }
    };
}]);
//myApp.factory('myService', function() {});
