/**
 * Created by Nick on 3/22/2016.
 */

var app = angular.module('storyWriteApp', []);

app.service('storyWriteService', function($http){

    var selfServ = this;
    this.dataServ = null;

    this.getPrompt = function(promptID){
        console.log('Attempting to contact server');

        return $http({
            url: 'get_prompts.php',
            method: 'post',
            cache: false,
            headers : {'Content-Type': 'application/x-www-form-urlencoded'},
            data: $.param({
                mode: 'single',
                prompt_id: promptID
            })
        })
            .then(
                function(response){
                    console.log('Success', response);
                    selfServ.dataServ = response.data.data[0];
                    console.log(selfServ.dataServ);
                },
                function(error){
                    console.log('Failure',error);
                    selfServ.dataServ = error;
                }
            );
    }

    this.postStory = function (title, story) {
        console.log('Attempting to contact server');

        return $http({
            url: 'edit_prompts.php',
            method: 'post',
            cache: false,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: $.param({
                mode: 'add',
                title: description,
                description: description,
                genre: genre,
                setting: setting
            })
        })
            .then(
                function (response) {
                    console.log('Success', response);
                },
                function (error) {
                    console.log('Failure', error);
                }
            );
    };
});

app.controller('storyWriteController', function(storyWriteService){
    var selfCont = this;

    storyWriteService.getPrompt(16).then(
        function () {
            selfCont.prompt = storyWriteService.dataServ.description;
            selfCont.genre = storyWriteService.dataServ.genre;
            selfCont.setting = storyWriteService.dataServ.setting;
            selfCont.poster = storyWriteService.dataServ.user_id;
            selfCont.postDate = storyWriteService.dataServ.created;
        });

    this.post = storyWriteService.postStory;
});

