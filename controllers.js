    angular.module("storyPress")
        /**
         * Character Creation Service - Not yet implemented used for testing ajax requests
        * */
        .service("characterService", function ($http) {
            this.test = "test variable";

            this.createCharacter = function () {

                return $http({
                    method: 'POST',
                    url: "get_stories.php",
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
        /**
         * Main User Service for holding User Data and if making user creations and login Ajax requests
        * */
        .service("userProfileService", function ($http) {
            var userProfileScope = this;
            //check if user logged in
            var loggedIn = false;

            var baseUrl = "userHandler.php";

            //this.test = "testing yo";
            //holds User Data
            this.userData = {name: "inital value"};
            //User Sign in ajax request takes name and password
            this.loadUserData = function(name, key){
                //converts to string for php servers
                var dataString = $.param({user_name: name, password: key});

                return $http({
                    method: "POST",
                    url: 'userHandler.php',
                    data: dataString,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    cache: false,
                    dataType: "json"
                })
                    .then(function (response) {
                            //console.log(response);
                            //no useful info in the login response given so have to rely on input data;
                            //TODO get back end to give us email and id in response
                            userProfileScope.userData.name = name;
                            userProfileScope.loggedIn = true;
                        },
                        function (error) {
                            console.log(error);
                        });
            };
            /**
             Create new user Ajax request
            * */
            this.createUser = function(name, emailAddress, key, confirm){

                var dataString = $.param({
                    user_name: name,
                    email: emailAddress,
                    password: key,
                    passwordConfirm: confirm
                });

                return $http({
                    method: "POST",
                    url: 'newuserHandler.php',
                    data: dataString,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    cache: false,
                    dataType: "json"
                })
                    .then(function (response) {
                            console.log(response);
                            userProfileScope.userData.name = name;
                            userProfileScope.loggedIn = true;
                        },
                        function (error) {
                            console.log(error);
                        });
            }
        })

        .controller("userProfileController", function (userProfileService, $log) {
            var userProfileScope = this;

            //this.test = userProfileService.test;
            //check if user is logged in
            this.loggedIn = userProfileService.loggedIn;
            //get user data from server
            this.userData = userProfileService.userData;
            //a loading variable
            this.loading = "";

            this.submitLoad = function(){
                return this.loading;
            };

            this.loginUser = function(){
                console.log("login attempt", userProfileScope.loggedIn, userProfileService.userData);
                var userName =  $('#name').val();
                var password = $('#password').val();
                //console.log(userName, password);
                userProfileService.loadUserData(userName, password)
                    .then(function(response){
                        userProfileScope.userData = userProfileService.userData;
                        console.log("login success", userProfileScope.userData);
                        userProfileScope.loggedIn = true;
                    },function(error){
                        $log.warn(error);
                        userProfileScope.loggedIn = false;
                    });
            };

            this.signUp = function(){
                var userName =  $('#name').val();
                var email = $('#email').val();
                var password = $('#password').val();
                var passwordConfirm = $('#confirm_password').val();
                userProfileService.createUser(userName, email, password, passwordConfirm)
                    .then(function(response){
                        userProfileScope.userData = userProfileService.userData;
                        console.log("login success");
                        userProfileScope.loggedIn = true;
                    }, function(error){
                       $log.warn(error);
                        userProfileScope.loggedIn = false;
                    });
            }
        })

        .controller("characterController", function (characterService, $log, $scope) {
            this.tester = characterService.test;
            characterScope = this;
            this.char = {};
            this.name = "";
            this.key = "";
            this.loading = "Submit";
            this.logIt = function () {
                console.log(this.char);
            };

            this.data = {};
            this.results = characterService.results;

            this.submitLoad = function () {
                return this.loading;
            };

            this.sendCharacter = function () {
                this.loading = "Loading";
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
        });

