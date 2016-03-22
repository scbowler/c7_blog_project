<!--login_form.php-->
<!DOCTYPE html>
<html>
<head>
    <title></title>
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script>
        function ajaxCall(name, emailAddress, key, confirm ){
            var userInformation = {
                user_name: name,
                email: emailAddress,
                password: key,
                passwordConfirm: confirm
            };
            if(userInformation.password === userInformation.passwordConfirm){
                $.ajax({
                    url: 'newuserHandler.php',
                    data: userInformation,
                    cache: false,
                    method: 'POST',
                    dataType: 'json',
                    success: function(response){
                        console.log('AJAX call success! ', response);
                        if(response.success){
                            //var message = $('<p>').text('Signup is successful!');
                            //$('#message').empty().append(message);
                        }else{
                            var message = $('<p>').text('Signup is unsuccessful please try again!');
                            $('#message').empty().append(message);
                        }
                    },
                    error: function(){
                        console.log('AJAX call failed');
                    }
                });
            } else {
                var message = $('<p>').text('Password does not match. Please try again');
                $('#message').empty().append(message);
            }
        }
        $(document).ready(function(){
            console.log('jQuery is fine!');
            $('#button').on('click', function(){
                var userName =  $('#name').val();
                var email = $('#email').val();
                var password = $('#password').val();
                var passwordConfirm = $('#confirm_password').val();
                ajaxCall(userName, email, password, passwordConfirm);
            });
        });
    </script>
</head>
<body>
<form>
    <input type="text" placeholder="name" class="success" id="name">
    <input type="text" placeholder="e-mail address" class="success" id="email">
    <input type="text" placeholder="password" id="password">
    <input type="text" placeholder="confirm password" id="confirm_password">
    <input type="button" id="button" value="Sign Up">
    <div id="message"></div>
</form>
</body>
</html>