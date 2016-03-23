/**
 * Created by Nick on 3/22/2016.
 */

var app = angular.module('storyWriteApp', []);

app.service('storyWriteService', function($http){

    var selfServ = this;
    this.dataServ = null;

    this.getPrompt = function(promptID){
        console.log('Attempting to contact server');
        $http({
            url: 'get_prompts.php',
            method: 'post',
            cache: false
        })
            .then(
                function(response){
                    console.log('Success', response);
                    selfServ.dataServ = response;
                },
                function(response){
                    console.log('Failure',response);
                    selfServ.dataServ = response;
                }
            );
    }
});

app.controller('storyWriteController', function(storyWriteService){
    var selfCont = this;

    storyWriteService.getPrompt(1);
});

