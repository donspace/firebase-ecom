const admin = require('firebase-admin');
admin.initializeApp();

var searchController=require('./controllers/search-controller');
var adController=require('./controllers/ad-controller');

module.exports={
    search:searchController,
    ad:adController
}
