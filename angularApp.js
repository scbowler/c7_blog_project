
    angular.module("storyPress", ['ngRoute'])
        .config(function($routeProvider){
            $routeProvider
                .when('/index', {
                    templateUrl: 'fakeLandingPage.html',
                    controller: 'landingPageController',
                    controllerAs: 'lc'
                })
                .when('/login', {
                    templateUrl: 'userProfile.html',
                    controller: 'userProfileController',
                    controllerAs: 'uc'
                })
                .when('/account', {
                    templateUrl: 'userProfile.html',
                    controller: "userProfileController",
                    controllerAs: 'uc'
                })
                .when('/create', {
                    templateUrl: 'newUser.html',
                    controller: 'userProfileController',
                    controllerAs: 'uc'
                })
                .when('/character',{
                    templateUrl: 'characterCreation.html',
                    controller: "characterController",
                    controllerAs: 'cc'
                })
                .when('/somethingelse',{
                    templateUrl: 'userLogin.html',
                    controller: "userProfileController",
                    controllerAs: 'uc'
                })
                .when('/storyWrite',{
                    templateUrl: 'storyWrite.html',
                    controller: "storyWriteController",
                    controllerAs: 'swc'
                })
                .when('/promptWrite',{
                    templateUrl: 'promptWrite.html',
                    controller: "promptWriteController",
                    controllerAs: 'pwc'
                })
                .otherwise({
                    redirectTo: '/index'
                })
        })

