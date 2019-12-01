const functions = require('firebase-functions');
const admin = require('firebase-admin');
var firestore = admin.firestore();

module.exports = {
    createAd: functions.https.onCall((data, context) => {

        return firestore.collection("advertisements").add(data.advertisementObject)
            .then(function (result) {
                return result;
            }).catch(function (error) {
                //revert function
                throw new functions.https.HttpsError("unavailable", "Some Issue");

            })

    })
}
