
    angular.module("storyPress", ['ngRoute'])
        .config(function($routeProvider){
            $routeProvider
                .when('/index', {
                    templateUrl: 'fakeLandingPage.html'
                })
                .when('/login', {
                    templateUrl: 'userLogin.html',
                    controller: 'userCtrl',
                    controllerAs: 'uc'
                })
                .when('/account', {
                    templateUrl: 'userProfile.html',
                    controller: "userProfileController",
                    controllerAs: 'uc'
                })
                .when('/create', {
                    templateUrl: 'userCreate.html',
                    controller: 'newUserCtrl',
                    controllerAs: 'nuc'
                })
                .when('/character',{
                    templateUrl: 'characterCreation.html',
                    controller: "characterController",
                    controllerAs: 'cc'
                })
                .otherwise({
                    redirectTo: '/index'
                })
        })


