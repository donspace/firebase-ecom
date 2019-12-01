function UserManager(FBAuthService, FBFirestoreService, ConfigConstant) {
    //this functions are denoted by _ underscore

    function _getUserProfileData() {
        return FBFirestoreService.getUserProfileData().then(function (result) {
            console.log("user profile : ", result);
            Lockr.set('userProfile', result);
            return result;
        });
    }

    function _updateUserData(userObj) {
        return FBFirestoreService.updateUserCollection(userObj);
    }

    return {

        signin: function (email, password) {

            return FBAuthService.signin(email, password)
                .then(function (result) {
                    return _getUserProfileData();
                });
        },

        signinWithFacebook: function () {

            return FBAuthService.signinWithFacebook()
                .then(function (user) {

                    user.signinProvider = ConfigConstant.SOCIAL_MEDIA.PROVIDER_NAME.FACEBOOK;
                    return _updateUserData(user);
                })
                .then(function (result) {
                    return _getUserProfileData();
                });
        },

        signinWithGmail: function () {

            return FBAuthService.signinWithGmail()
                .then(function (user) {

                    user.signinProvider = ConfigConstant.SOCIAL_MEDIA.PROVIDER_NAME.GMAIL;
                    return _updateUserData(user);
                })
                .then(function (result) {
                    return _getUserProfileData();
                });
        },

        signinWithTwitter: function () {

            return FBAuthService.signinWithTwitter()
                .then(function (user) {

                    user.signinProvider = ConfigConstant.SOCIAL_MEDIA.PROVIDER_NAME.TWITTER;
                    return _updateUserData(user);
                })
                .then(function (result) {
                    return _getUserProfileData();
                });
        },

        signup: function (email, password, displayName) {

            return FBAuthService.signup(email, password)
                .then(function (response) {
                    return _updateUserData(
                        {
                            "displayName": displayName,
                            "email": email, "username": email
                        }
                    ); a
                }).then(function (result) {
                    return _getUserProfileData();
                });
        },


        logout: function () {

            return FBAuthService.logout().then(function (result) {
                Lockr.rm('userProfile');
                return result;
            });
        },

        getUserProfileData: function () {
            return _getUserProfileData();
        },

        updateUserData: function (userObj) {
            return _updateUserData(userObj);
        },

        updateUserProfile: function (userDetails) {

            return FBAuthService.updateUserProfile(userDetails);
        },

        getCurrentUser: function (ignoreProfileData) {

            var currentUser = {
                metadata: firebase.auth().currentUser,
                profileData: Lockr.get('userProfile')
            }

            if (currentUser.metadata && (currentUser.profileData || ignoreProfileData) ) {
                return  new Promise(function (resolve, reject) {
                    resolve(currentUser);
                });;
            } else if (currentUser.metadata && !currentUser.profileData) {
                //profile data is not ready

                return _getUserProfileData()
                    .then(function (result) {
                        currentUser.profileData = result;
                        return currentUser;
                    })
            } else if (!currentUser.metadata) {
                //not logged in or not yet finished the login request
                return new Promise(function (resolve, reject) {
                    firebaseApp.auth().onAuthStateChanged(function (user) {
                        if (user) {
                            resolve(user);
                        } else {
                            reject(null);
                        }
                    });
                }).then(function(user){
                    currentUser.metadata = user;
                    return _getUserProfileData();
                }).then(function (result) {
                    currentUser.profileData = result;
                    return currentUser;
                }).catch(function(){
                    //if user not logged in
                    return new Promise(function (resolve, reject) {
                        resolve(null);
                    });
                })
            }

        },

        updateUserProfileSecured: function (password, userDetails) {

            return null;
        }

    }
}

angular.module('userAuth').factory('UserManager', [
    'FBAuthService', 'FBFirestoreService', 'ConfigConstant',
    UserManager]);