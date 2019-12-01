function HelperFunctions(ConfigConstant) {

    return {
        generatePublicReferenceForAdvertisement: function (postAddConstObj) {

            var publicReference = postAddConstObj.title + " " + postAddConstObj.advertisementLocation.city;

            var date = new Date();
            var locale = "en-us";
            var month = date.toLocaleString("en-us", { month: "long" });
            var year = date.getFullYear();

            publicReference = " " + publicReference + year + " " + month + " " + date.valueOf();
            publicReference = publicReference + " " + Math.floor((Math.random() * 10) + 1);


            //remove special characters
            publicReference = publicReference.replace(/[^a-zA-Z0-9\s]/g, '');

            //trim white spaces to single character
            publicReference = publicReference.replace(/\s\s+/g, ' ');

            publicReference = publicReference.replace(/\s/g, "-");

            publicReference = publicReference.toLowerCase();
            return publicReference;
        },

        generateFolderNameByPublicReference: function (publicReference,numberOfImages) {

            var imageReferences = [];
            var folderName = btoa(publicReference).replace(/\s/g, '') + Math.floor((Math.random() * 10) + 1);
            for (var i = 0; i < numberOfImages; i++) {
                imageReferences.push(folderName + "/image_" + i.toString());
            }
            return imageReferences;
        },

        setImagePaths: function (searchResults) {
            searchResults.forEach(function (result) {
                result.imageReferences = setFullImagePaths(result.imageReferences);
            });

            return searchResults;

            function setFullImagePaths(imageReferences) {
                var fullRefList = [];
                imageReferences.forEach(function (ref) {
                    fullRefList.push(("https://" + ConfigConstant.AWS.BUCKET + "." + ConfigConstant.OBJ_ENDPOINT.AD_IMAGE + "/" + ref));
                })
                return fullRefList;
            }
        }
    }


};

angular.module('app').factory('HelperFunctions',[
'ConfigConstant',
HelperFunctions]);