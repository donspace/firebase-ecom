function ConfigurationManager(ConfigConstant,
    $translateProvider,
    TranslationSinhalaConstant,
    TranslationEnglishConstant) {

    var metaConfig = null;
    var db = null;

    var updateAllConfigurations = function () {
        return db.collection("config").doc("app-config").get().then(function (result) {
            metaConfig={};
            var resultDoc = result.data()
            for (var prop in result.data()) {
                metaConfig[prop] = JSON.parse(resultDoc[prop]);
            }
            console.log("latestConfig : ", metaConfig);
        });
    }

    var setUserPreferedLanguage = function (lan) {
        Lockr.set('preferredLanguage', lan);
        $translateProvider.preferredLanguage(lan);
    }

    var setAllTranslations = function () {
        $translateProvider.translations('sinhala', TranslationSinhalaConstant);
        $translateProvider.translations('english', TranslationEnglishConstant);

        var preferredLanguage = Lockr.get('preferredLanguage')

        if (preferredLanguage) {
            $translateProvider.preferredLanguage(preferredLanguage);
        } else {
            setUserPreferedLanguage('sinhala');
        }
    }

    function initializeFirebase() {

        var config = {
            apiKey: "AIzaSyD7I0BqF07JMsLNssnfgJHI95b4p5gcKdY",
            authDomain: "downtown-firebase.firebaseapp.com",
            databaseURL: "https://downtown-firebase.firebaseio.com",
            projectId: "downtown-firebase",
            storageBucket: "downtown-firebase.appspot.com",
            messagingSenderId: "188869978615"
        };

        firebase.initializeApp(config);

        const firestore = firebase.firestore();
        const settings = { timestampsInSnapshots: true };
        firestore.settings(settings);

        console.log("firebase Initialized: ", firebase);

        db = firebase.firestore();
    }

    function initializeFileStorage() {
        var spacesEndpoint = new AWS.Endpoint(ConfigConstant.OBJ_ENDPOINT.AD_IMAGE);
        var s3 = new AWS.S3({
            endpoint: spacesEndpoint,
            accessKeyId: 'A7DNWZPTXNTCDYOHDDIU',
            secretAccessKey: 'LrIfi6VkO0qLxujisiePc4m++FueYHa8/GMiLH6Pkx0'
        });

        AWS.digitalOceanSpacesObject = {
            adImage: s3
        };
        console.log("AWS initialized", AWS.digitalOceanSpacesObject);
    }

    function initializeFacebook() {

        window.fbAsyncInit = function () {
            FB.init({
                appId: '267722390554780',
                cookie: true,
                xfbml: true,
                version: 'v3.2'
            });
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        console.log("Facebook initialized");
    }

    return {

        updateConfigurationsToLatest: updateAllConfigurations,
        setTranslations: setAllTranslations,
        setPreferedLanguage: setUserPreferedLanguage,
        initializeFirebase: initializeFirebase,
        initializeFileStorage: initializeFileStorage,
        initializeFacebook: initializeFacebook,

        $get: function () {
            return {
                
                getMetaConfig: function (mustRefresh) {
                    if (metaConfig == null || mustRefresh) {
                        return updateAllConfigurations()
                            .then(function () {
                                return metaConfig;
                            })
                    } else {
                        return new Promise(function (resolve, reject) {
                            resolve(metaConfig);
                        });
                    }
                }

            };
        }

    };
}

angular.module('app').provider('ConfigurationManager', [
    'ConfigConstant',
    '$translateProvider',
    'TranslationSinhalaConstant',
    'TranslationEnglishConstant',
    ConfigurationManager]);