/**
 * Created by Nick on 3/22/2016.
 */

app.service('promptWriteService', function($http) {

    this.postPrompt = function (description, genre, setting) {
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

app.controller('promptWriteController', function(promptWriteService){
    this.post = promptWriteService.postPrompt;

    this.testMsg = "This Is a test message promptWrtie"
});