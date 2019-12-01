var x = {
    ownerId: "user-id-0001",               //owner of the add
    businessId: "business-id",            //business
    branchId: "branch-id",               //geo located branch

    contactUnder: ["owner", "business", "branch", "ad"],

    advertisementContacts: { //val or null

        contactNumber: {
            countryCode: "+94",
            digits: "710777888"
        },
        email: "aaaa@bbb.com"
    },

    locateUnder: ["owner", "business", "branch", "ad"],
    advertisementLocation: {
        area: "Koswatta",
        city: "Sri Jayawardenepura Kotte",
        country: "Sri Lanka",
        latitude: "79.000000",
        longitude: "6.900000",
        province: "Western Province",
        state: "Colombo"
    },


    title: "Test Title",
    description: "this is test description",

    pricing: {
        isNegotiable: true,
        askForPrice: true,
        currencyCode: "LKR",
        isUnitPrice: true,
        price: 2400,
        unitQuantity: 5,
        unitType:"units"
    },

    tags:{
        "suv":true,
        "latest model":true
    },

    properties:{
        //id and value
        "prop-4wheel":true,
        "prop-year":2018,
        "cus-prop-213213":true
    },

    options:{
        "prop-4wheel":true
    },

    publicReference: "car-sale-montero-sport-2017-gampaha-4252672",
    category: "vehicles",
    subCategory: "suv",

    imageReferences: ["link1", "link2", "link3"],

    isSold: false,
    isDeleted: false,
    isPublished: true,


    postedTimestamp: "",
    updatedTimestamp: "",
    soldTimestamp: "",
    deletedTimestamp: ""

}

var propTemplate={
    
    icon:"blah/blah.ico",
    propId:"prop-4wheel",
    propName:{
        default:"four_wheel",
        "four_wheel":true,
        "4_wheel":true
    },
    type:"bool",
    list:null,
    value: null
}

var cusPropTemplate={
    icon:null,
    propId:"prop-ps",
    propName:{
        default:"power_shutters",
        "power_shutters":true
    },
    value:true,
    type:"bool",
    list:null,
}