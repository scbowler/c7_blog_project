<!--login_form.php-->
<!DOCTYPE html>
<html>
<head>
    <title></title>
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script>
        function ajaxCall(name, key){
            var userInformation = {
                user_name: name,
                password: key
            };
            console.log('username: ', name, ', password: ', key);
            $.ajax({
                url: 'userHandler.php',
                data: userInformation,
                cache: false,
                method: 'POST',
                dataType: 'json',
                success: function(response){
                    console.log('AJAX call success! ', response);
                    if(response.success){
                        var message = $('<p>').text('Username and passwords match!');
                        $('#message').empty().append(message);
                    }else{
                        var message = $('<p>').text('Username and passwords does not match!');
                        $('#message').empty().append(message);
                    }
                },
                error: function(){
                    console.log('AJAX call failed');
                }
            });
        }
        $(document).ready(function(){
            console.log('jQuery is fine!');
            $('#button').on('click', function(){
                var userName =  $('#name').val();
                var password = $('#password').val();
                ajaxCall(userName, password);
            });
        });
    </script>
</head>
<body>
<form>
    <input type="text" placeholder="name" class="success" id="name">
    <input type="text" placeholder="password" id="password">
    <input type="button" id="button" value="Log In">
    <div id="message"></div>
</form>
</body>
</html>