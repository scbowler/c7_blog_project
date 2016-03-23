
    angular.module("storyPress")

        .service("characterService", function ($http) {
            this.test = "testing yo";
            var service = {};
            var baseUrl = "get_prompts.php";
            var url = '';
            var char = '';
            var makeUrl = function () {
                url = baseUrl// + char + "&callback=JSON_CALLBACK"
            };
            this.setInfo = function (charObj) {
                char = charObj;
            };
            this.createCharacter = function () {
                makeUrl();
                console.log(url);

                return $http({
                    method: 'POST',
                    url: baseUrl,
                    data: {mode: 'user', id: 7},
                    dataType: "json"
                })
                    .then(function (response) {
                        return response;
                    }, function (error) {
                        return error;
                    });
            };

            this.getData = function () {
                return $.ajax({
                    url: 'get_prompts.php',
                    method: 'POST',
                    data: {mode: 'all', page: 1, per_page: 2},
                    //   data: {mode:'user', id:7},
                    dataType: 'json',
                    success: function (response) {
                        console.log(response);
                        //return response;
                    }
                });
            }
        })
        .service("userProfileService", function ($http) {
            var userProfileScope = this;
            this.test = "testing yo";
            var baseUrl = "get_stories.php";
            var url = '';
            var char = '';
            this.userData = {};
            this.allData = {};

            var makeUrl = function(){
                url = baseUrl + char + "&callback=JSON_CALLBACK"
            };

            this.setInfo = function(charObj){
                char = charObj;
            };

            this.loadUserData = function(){
                makeUrl();

                var dataString = $.param({mode:"all", page:1, per_page: 10});

                return $http({
                    method: "POST",
                    url: baseUrl,
                    data: dataString,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                    .then(function (response) {
                            console.log(response);
                            //userProfileScope.allData = response.data.data;

//                                        var rand = Math.floor(Math.random()* response.data.data.length);
//                                        userProfileScope.userData = response.data.data[rand];
                        },
                        function (error) {
                            return error;
                        });
            }
        })

        .controller("userProfileController", function (userProfileService, $log) {
            this.tester = userProfileService.test;
            var userProfileScope = this;
            this.userData = userProfileService.userData;
            this.allData = userProfileService.allData;
            this.loading = "Load";

            this.results = userProfileService.results;

            this.sendCharInfo = function(){
                userProfileService.setInfo(this.char.name);
            };

            this.submitLoad = function(){
                return this.loading;
            };
            this.sendCharacter = function(){
                userProfileService.loadUserData()
                    .then(function(response){
                        userProfileScope.userData = userProfileService.userData;
                        userProfileScope.allData = userProfileService.allData;
                    },function(error){
                        $log.warn(error);
                    });

            };
        })


        .controller("characterController", function (characterService, $log, $scope) {
            this.tester = characterService.test;
            characterScope = this;
            this.char = {};
            this.loading = "Submit";
            this.logIt = function () {
                console.log(this.char);
            };

            this.data = {};
            this.results = characterService.results;

            this.sendCharInfo = function () {
                characterService.setInfo(this.char.name);
            };

            this.submitLoad = function () {
                return this.loading;
            };

            this.sendCharacter = function () {
                this.loading = "Loading";
                this.sendCharInfo();
                characterService.getData()
                    .then(function (response) {
                        console.log(response.data);
                        characterScope.data = response.data;
                        $scope.$digest();
                        characterScope.data = response.data.data;
                        characterScope.loading = "Submit";
                        characterScope.char = {};

                    }, function (data) {
                        $log.warn(data);
//                                characterScope.loading = "Submit";
                    });
            };
        })
