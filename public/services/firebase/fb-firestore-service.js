function FBFirestoreService() {


    var db = firebase.firestore();


    return {

        updateUserCollection: function (userDetails) {

            var user = firebase.auth().currentUser;

            if (user) {
                return db.doc("users/" + user.uid).set(userDetails, { merge: true });
            } else {
                return Promise.reject(new Error('null user'));
            }
        },
        getUserProfileData: function () {

            var user = firebase.auth().currentUser;

            if (user) {
                return db.collection("users").doc(user.uid).get()
                    .then(function (userDoc) {
                        return userDoc.data();
                    });

            } else {
                return Promise.reject(new Error('null user'));
            }
        },
        getDocumentsByProperty: function (collection, key, condition, value) {
            console.log("t1 : ", new Date().valueOf());
            return db.collection(collection).where(key, condition, value)
                .get()
                .then(function (querySnapshot) {
                    console.log("LENGTH : ", querySnapshot.size);
                    var document;
                    querySnapshot.forEach(function (doc) {
                        document = doc.data();
                    });

                    return document;
                });
        },
        getAppConfiguration: function () {
            return db.collection("config").doc("app-config").get();
        },

        postNewAdvertisement: function (advertisementObject) {
            return db.collection("advertisements").add(advertisementObject);
        },
        getAdvertisementPropertiesById(idList) {
            var promiseList = [];
            for (var i = 0; i < idList.length; i++) {

                promiseList.push(new Promise(function (resolve) {
                    return db.collection("adProperties").doc(idList[i]).get()
                        .then(function (doc) { doc.exists ? resolve(doc.data()) : reject("No Data") })
                        .catch(function (err) { reject(err) })
                }))
            }

            return Promise.all(promiseList)
                .then(function (docList) {
                    for (var i = 0; i < idList.length; i++) {
                        docList[i].adPropertyId = idList[i];
                    }
                    return docList;
                })
        }

    }
}

angular.module('firebaseCustomModules').service('FBFirestoreService', FBFirestoreService);