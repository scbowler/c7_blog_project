/**
 * Created by Nick on 3/22/2016.
 */

var app = angular.module('promptWriteApp', []);

app.service('promptWriteService', function(){
    var selfServ = this;
    this.dataServ = null;

    this.postPrompt = function(promptID){
        console.log('Attempting to contact server');

        return $http({
            url: 'edit_prompts.php',
            method: 'post',
            cache: false,
            headers : {'Content-Type': 'application/x-www-form-urlencoded'},
            data: $.param({
                mode: 'add',
                title: 'Dummy Title 1',
                description: 'Dummy Prompt 1',
                genre: 'Dummy Genre 1',
                setting: 'Dummy Setting 1'
            })
        })
            .then(
                function(response){
                    console.log('Success', response);
                },
                function(error){
                    console.log('Failure',error);
                }
            );

        /*$.ajax({
            url: 'edit_prompts.php',
            method: 'post',
            cache: false,
            data: {
                mode: 'add',
                title: 'Dummy Title 1',
                description: 'Dummy Prompt 1',
                genre: 'Dummy Genre 1',
                setting: 'Dummy Setting 1'
            },
            success: function(response) {
                console.log('Success', response);
                selfServ.dataServ = response.data;
            },
            error: function(response) {
                console.log('Failure', response);
            }
        });*/
};

app.controller('promptWriteController', function(promptWriteService){
    this.post = promptWriteService.postPrompt;
});