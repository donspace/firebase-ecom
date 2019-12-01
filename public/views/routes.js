//routes.js
var routerApp = angular.module('routes', []);

routerApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider.state('root', {
        url: '/',
        templateUrl: 'views/home/root.html',
        controller: RootController
    });

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'views/home/home-template.html',
        controller: HomeController
    });

    $stateProvider.state('search', {
        url: '/search?q',
        templateUrl: 'views/home/search.html',
        controller: SearchController
    });

    $stateProvider.state('login', {
        url: '/login?path=null',
        params: {
            path: null
        },
        templateUrl: 'views/user/login.html',
        controller: LoginController
    });


    /**
     *Post login routes 
     Settings
     Post Add
     Start A Business
     */
    $stateProvider.state('header', {
        templateUrl: 'views/master-pages/header-masterpage.html'
    });

    $stateProvider.state('header.marginBox', {
        templateUrl: 'views/master-pages/margin-box-masterpage.html'
    });


    /**
    * Settings
    */
    $stateProvider.state('header.marginBox.settings', {
        url: '/settings',
        templateUrl: 'views/settings/settings-masterpage.html',
        controller: SettingsController
    });

    $stateProvider.state('header.marginBox.settings.profile', {
        url: '/profile',
        templateUrl: 'views/settings/profile-settings.html'
    });


    /**
     * Create an add
     * 
     */
    $stateProvider.state('header.marginBox.createAd', {
        url: '/advertisement',
        templateUrl: 'views/advertisement/create-advertisement/create-ad-masterpage.html',
        authLevel: 0
    });

    $stateProvider.state('header.marginBox.createAd.selectCategory', {
        url: '/categorySelection',
        controller: CreateAdCategoryController,
        templateUrl: 'views/advertisement/create-advertisement/category-template.html',
        authLevel: 2
    });

    $stateProvider.state('header.marginBox.createAd.details', {
        url: '/details',
        controller: CreateAdDetailsController,
        templateUrl: 'views/advertisement/create-advertisement/details-template.html',
        authLevel: 2
    });

    $stateProvider.state('header.marginBox.createAd.verification', {
        url: '/verification',
        controller: CreateAdVerifyController,
        templateUrl: 'views/advertisement/create-advertisement/verify-template.html',
        authLevel: 2
    });

    // $stateProvider.state('header.marginBox.postAdd', {
    //     url: '/advertisement',
    //     controller: PostAdvertisementController,
    //     templateUrl: 'views/advertisement/post-advertisement-masterpage.html',
    //     authLevel: 0
    // });

    // $stateProvider.state('header.marginBox.postAdd.selectCategory', {
    //     url: '/categorySelection',
    //     controller: PostAddCategorySelectionController,
    //     templateUrl: 'views/advertisement/category-selection.html',
    //     authLevel: 2
    // });

    // $stateProvider.state('header.marginBox.postAdd.details', {
    //     url: '/details',
    //     controller: PostAddDetailsController,
    //     templateUrl: 'views/advertisement/details.html',
    //     authLevel: 2
    // });

    /**
     * View an add
     * 
     */

    $stateProvider.state('viewAd', {
        url: '/ads/:publicReference',
        controller: ViewAdvertisementController,
        templateUrl: 'views/advertisement/view-advertisement/view-advertisement.html'
    });

    /**
     * Business Page
     * 
     */

    $stateProvider.state('businessPage', {
        templateUrl: 'views/business-page/business-masterpage.html'
    });

    $stateProvider.state('businessPage.pageContent', {
        url: '/biz/:publicReference',
        templateUrl: 'views/business-page/page-content.html',
        controller:BusinessPageController
    });

    $stateProvider.state('businessPage.onlineStore', {
        url: '/biz/:publicReference/store',
        templateUrl: 'views/business-page/online-store.html'
    });

    /**
     * Forum 
     * 
     */

    $stateProvider.state('forum', {
        templateUrl: 'views/forum/forum-masterpage.html',
        controller:ForumController
    });

    $stateProvider.state('forum.feed', {
        url: '/forum',
        templateUrl: 'views/forum/forum-feed.html'
    });

    $stateProvider.state('forum.review', {
        url: '/forum/reviews',
        templateUrl: 'views/forum/forum-review.html'
    });

    $stateProvider.state('forum.topics', {
        url: '/forum/topics',
        templateUrl: 'views/forum/forum-topics.html'
    });

    $stateProvider.state('forum.comparisons', {
        url: '/forum/comparisons',
        templateUrl: 'views/forum/forum-comparison.html'
    });

    $locationProvider.html5Mode(true);

});
