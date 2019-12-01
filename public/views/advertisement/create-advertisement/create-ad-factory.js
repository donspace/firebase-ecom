function createAdHandler(AdvertisementManager, UserManager,ConfigurationManager) {

    var adMetadata = null;
    var newAd = null;
    var imageFileList=null;

    function initiateAdvertisment(metadata) {

        newAd = {
            ownerId: null,               //owner of the add
            businessId: null,            //business
            branchId: null,

            subCategoryId: metadata.subCategoryId,
            contactUnder: "ad",
            locateUnder: "ad",

            pricing: {
                isNegotiable: false,
                askForPrice: false,
                currencyCode: "LKR",
                isUnitPrice: false,
                price: null,
                unitQuantity: null,
            },

            advertisementContacts: { //val or null

                contactNumber: {
                    countryCode: null,
                    digits: null
                },
                email: null
            },

            properties: {}
        };


        if(adMetadata.properties){
            adMetadata.properties.forEach(adProp => {
                newAd.properties[adProp.adPropertyId] = null;
            });
        }
        

        return UserManager.getCurrentUser()
            .then(function (currentUser) {
                if(!currentUser)newAd = null;
                
                newAd.advertisementContacts.email= currentUser.profileData.email;
                newAd.advertisementContacts.contactNumber.digits= currentUser.profileData.phoneNumber;
                newAd.advertisementContacts.contactNumber.digits="+94";

            })

    }

    return {

        getAdvertisement: function () {
            return newAd;
        },
        setAd:function(adObj){
            newAd =adObj;
        },
        getAdMetadata: function () {
            return adMetadata;
        },
        generateAdMetadata: function (subCatId,subCat) {
            adMetadata = {};
            adMetadata.subCategoryId = subCatId;

            return AdvertisementManager.getAdvertisementPropertiesById(subCat.properties)
                .then(function (propertyObject) {
                    adMetadata.properties = propertyObject;
                    adMetadata.metricType=subCat.metricType;
                    return ConfigurationManager.getMetaConfig();

                }).then(function(metaConfig){
                    adMetadata.metricList =adMetadata.metricType?metaConfig.metricConfig[adMetadata.metricType]:null;
                    return initiateAdvertisment(adMetadata);
                })

        },
        setImageFileList:function(imgList){
            imageFileList=imgList;
        },
        getImageFileList:function(imgList){
            return imageFileList;
        }

    }
};

angular.module('createAd', []).factory('createAdFactory', createAdHandler);