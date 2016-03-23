
    angular.module("storyPress", ['ngRoute'])
        .config(function($routeProvider){
            $routeProvider
                .when('/index', {
                    templateUrl: 'fakeLandingPage.html'
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
                .otherwise({
                    redirectTo: '/index'
                })
        })

