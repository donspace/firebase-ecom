angular.module('app').constant('ConfigConstant', {
    OBJ_ENDPOINT: {
        AD_IMAGE: "sgp1.digitaloceanspaces.com/ads"
    },
    AWS: {
        BUCKET: "circle"
    },

    SOCIAL_MEDIA: {
        PROVIDER_NAME:{
            FACEBOOK:"facebook",
            GMAIL:"gmail",
            TWITTER:"twitter"
        },
        LOGIN: {
            SCOPE: {
                FACEBOOK: "",
                GMAIL: "https://www.googleapis.com/auth/contacts.readonly"
            },
            CUSTOM_PARAMS: {

                FACEBOOK: {
                    'display': 'popup'
                },
                GMAIL:{
                    'login_hint': 'user@example.com'
                },
                TWITTER:{
                    'lang': 'en'
                }

            }
        }
    }
});