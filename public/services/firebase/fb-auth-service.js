function FBAuthService(ConfigConstant) {

    const auth = firebase.auth();

    function _signinWithProvider(provider, scopes, customParams) {

        //requested scopes
        if(scopes)provider.addScope(scopes);

        //custom params to show with auth provider
        provider.setCustomParameters(customParams);

        return firebase.auth().signInWithPopup(provider)
            .then(function (result) {

                var user = {
                    displayName: result.user.displayName,
                    email: result.user.email,
                    emailVerified: result.user.emailVerified,
                    displayImageURL:result.user.photoURL,
                    phoneNumber:result.user.phoneNumber,
                    accessToken:result.credential.accessToken
                };
                console.log("socialuser", user);

                return user;

            }).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                // ...
            });

    }


    return {

        signin: function (email, password) {
            return auth.signInWithEmailAndPassword(email, password)
        },
        signinWithGmail() {
            return _signinWithProvider(
                new firebase.auth.GoogleAuthProvider(),
                ConfigConstant.SOCIAL_MEDIA.LOGIN.SCOPE.GMAIL,
                ConfigConstant.SOCIAL_MEDIA.LOGIN.CUSTOM_PARAMS.GMAIL);
        },
        signinWithFacebook() {
            return _signinWithProvider(
                new firebase.auth.FacebookAuthProvider(),
                ConfigConstant.SOCIAL_MEDIA.LOGIN.SCOPE.FACEBOOK,
                ConfigConstant.SOCIAL_MEDIA.LOGIN.CUSTOM_PARAMS.FACEBOOK);
        },
        signinWithTwitter() {
            return _signinWithProvider(
                new firebase.auth.TwitterAuthProvider(),
                null,
                ConfigConstant.SOCIAL_MEDIA.LOGIN.CUSTOM_PARAMS.TWITTER);
        },
        signup: function (email, password) {
            return auth.createUserWithEmailAndPassword(email, password)
        },
        logout: function () {
            return auth.signOut();
        },
        updateUserProfile: function (userDetails) {
            return auth.currentUser.updateProfile(userDetails);
        }
    }
}

angular.module('firebaseCustomModules', []).service('FBAuthService', [
    'ConfigConstant',
    FBAuthService]);