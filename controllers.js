app.service("characterService", function ($http) {
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
    var loggedIn = false;
    this.test = "testing yo";
    var baseUrl = "userHandler.php";
    var url = '';
    var char = '';
    this.userData = {name: "hey inital value"};

    this.setInfo = function(charObj){
        char = charObj;
    };
    //{mode:"all", page:1, per_page: 10}
    this.loadUserData = function(name, key){

        var dataString = $.param({user_name: name, password: key});

        return $http({
            method: "POST",
            url: baseUrl,
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
    };
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
    this.tester = userProfileService.test;
    var userProfileScope = this;
    this.loggedIn = userProfileService.loggedIn;
    this.userData = userProfileService.userData;
    this.allData = userProfileService.allData;
    this.loading = "";

    this.results = userProfileService.results;

    this.sendCharInfo = function(){
        userProfileService.setInfo(this.char.name);
    };

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
});

//    this.loadUserData = function(){
//        makeUrl();
//
//        var dataString = $.param({mode:"all", page:1, per_page: 10});
//
//        return $http({
//            method: "POST",
//            url: baseUrl,
//            data: dataString,
//            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
//        })
//            .then(function (response) {
//                    console.log(response);
//                    //userProfileScope.allData = response.data.data;
//
////                                        var rand = Math.floor(Math.random()* response.data.data.length);
////                                        userProfileScope.userData = response.data.data[rand];
//                },
//                function (error) {
//                    return error;
//                });
//    }
