const functions = require('firebase-functions');
const admin = require('firebase-admin');
var firestore = admin.firestore();

module.exports = {
    mainSearch: functions.https.onCall((data, context) => {
        var resultList = [];
        return firestore.collection("advertisements").get()
            .then(function (querySnapshot) {

                querySnapshot.forEach(function (doc) {
                    resultList.push(doc.data());
                });

                return resultList;

            }).catch(function (error) {

                throw new functions.https.HttpsError("unavailable", "No data available");

            })

    })
}
