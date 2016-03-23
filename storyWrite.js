/**
 * Created by Nick on 3/22/2016.
 */

var app = angular.module('storyWriteApp', []);

app.service('storyWriteService', function($http){

    var selfServ = this;
    this.dataServ = null;

    this.getPrompt = function(promptID){
        console.log('Attempting to contact server');

        /*$.ajax({
            url: 'get_prompts.php',
            method: 'post',
            cache: false,
            data: {
                mode: 'single',
                prompt_id: promptID
            },
            success: function(response) {
                console.log('Success', response);
                selfServ.dataServ = response.data;
            },
            error: function(response) {
                console.log('Failure', response);
            }
        });*/

        $http({
            url: 'get_prompts.php',
            method: 'post',
            cache: false,
            data: {
                mode: 'single',
                prompt_id: promptID
            }
        })
            .then(
                function(response){
                    console.log('Success', response);
                    selfServ.dataServ = response.data;
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

    storyWriteService.getPrompt(4);

    this.prompt = storyWriteService.dataServ.description;
    this.genre = storyWriteService.dataServ.genre;
    this.setting = storyWriteService.dataServ.setting;
    this.poster = storyWriteService.dataServ.user_id;
    this.postDate = storyWriteService.dataServ.created;
});

