//app.js

//firebase initialization
// Initialize Firebase


var app = angular.module('app', [
    'ui.router',
    'routes',
    'userAuth',
    'BusinessManager',
    'dashboard',
    'settings',
    'createAd',
    'viewAdd',
    'forum',
    'bizPage',
    'firebaseCustomModules',
    'AWSCustomModules',
    'pascalprecht.translate',
    'ui.carousel',
    'ngMaterial', 'ngMessages'
]);


app.config(function (ConfigurationManagerProvider) {

    ConfigurationManagerProvider.initializeFirebase();
    ConfigurationManagerProvider.initializeFileStorage();
    ConfigurationManagerProvider.initializeFacebook();
    ConfigurationManagerProvider.setTranslations();
    ConfigurationManagerProvider.updateConfigurationsToLatest();

});

app.run(function ($transitions, $state) {

    $transitions.onBefore({}, function (transition) {

        // check if the state should be protected
        var authLevel = transition.to().authLevel;
        var toState = transition.to().name;
        var currentUser =firebase.auth().currentUser;
    
        if (!authLevel || authLevel === 0 ) {
            return true;
        }else if(currentUser && authLevel === 2){
            //auth needed
            return true;
        }else{
            //if authentication needed on sudden refresh
            firebase.auth().onAuthStateChanged(function (user) {
                if (user && authLevel === 2) {
                    $state.go(toState);
                } else {
                    // No user is signed in.
                    urlRedirector();
                }
            });

            return false; //cancel the normal transition
        }


        function urlRedirector() {
            //redirect urls based on where it comes from
            var customPath = null;
            switch (toState) {
                case 'forum':
                    customPath = 'forum';
                    break;
                case 'header.marginBox.createAd.selectCategory':
                    customPath = 'create_ad';
                    break;
                default:
                    customPath = null;
            }
            $state.go('login',{ 'path': customPath });
            //return transition.router.stateService.target('login', { 'path': customPath });

        }



    })
})

