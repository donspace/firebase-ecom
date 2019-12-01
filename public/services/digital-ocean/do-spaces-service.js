function DOSpacesService(ConfigConstant) {


    var doSpaces = AWS.digitalOceanSpacesObject;


    return {

        insertAdvertisementImage: function (file, imageNameWithLocation) {
            var params = {
                Body: file,
                ACL: "public-read",
                ContentType: "image/png",
                //Metadata:"Details about image",
                Bucket: ConfigConstant.AWS.BUCKET,
                Key: imageNameWithLocation,
            };

            return doSpaces.adImage.putObject(params).promise();
        }

    }
}

angular.module('AWSCustomModules', []).service('DOSpacesService', [
'ConfigConstant',
DOSpacesService]);