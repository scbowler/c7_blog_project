app.service("landingPageService", function($http){
    this.currentPage = 1;
    var self = this;
    this.getData = function(){
        //  $('input').attr('disabled','disabled'); //disable buttons

        return $.ajax({
            url: 'get_prompts.php',
            method: 'POST',
            data: {mode:'all', page:self.currentPage, per_page:6},
            //   data: {mode:'user', id:7},
            dataType: 'json',
            success: function(response){
                // $('input').attr('disabled',''); //re-enable buttons
                //$('#displayResults').text(response); //Update Div
                console.log("current", self.currentPage);
                return response;
            }
        });
    };
    this.currentSet = function(direction) {
        if ("forward" == direction) {
            self.currentPage += 1;
        }
        else if ("backward" == direction) {
            self.currentPage -= 1;
        }
    }
})
.controller("landingPageController", function(landingPageService, $log, $scope){
    this.tester = landingPageService.test;
    characterScope = this;
    this.char = {};
    this.loading = "Submit";
    this.logIt = function(){
        console.log(this.char);
    };

    this.data = {};
    this.results = landingPageService.results;

    //this.sendCharInfo = function(){
    //    landingPageService.setInfo(this.char.name);
    //};

    this.submitLoad = function(){

        return this.loading;
    };

    this.sendCharacter = function(){
        this.loading = "Loading";
        //this.sendCharInfo();
        landingPageService.getData()
            .then(function(response){
                console.log(response.data);
                characterScope.data =  response.data;
                characterScope.loading = "Submit";
                characterScope.char = {};
                $scope.$digest();
            }, function(data){
                $log.warn(data);
                characterScope.loading = "Submit";
            });

    };

    this.nextPrevPage = (function(check){
        console.log("this", this);
        console.log("check current", landingPageService.currentPage);
        landingPageService.currentSet(check);

        if (landingPageService.currentPage==0) //Check for min
            landingPageService.currentPage=1;
        else if (landingPageService.currentPage==11) //Check for max
            landingPageService.currentPage=10;
        else
            landingPageService.getData()
                .then (function (response){
                    characterScope.data =  response.data;
                    $scope.$digest();
                });
    });
});