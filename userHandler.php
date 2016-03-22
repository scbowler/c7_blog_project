<?php
/**
 * Created by PhpStorm.
 * User: Kenneth
 * Date: 3/21/2016
 * Time: 8:08 PM
 */
    session_start();
    //call query from mySQL server.
    require('MySQL_connect.php');
    $query = "SELECT * FROM `users`";
    $mysqliQuery = mysqli_query($connect, $query);
    print_r($mysqliQuery);
    $user_id = [
        ['id'=> 1, 'userID' => 'bulbasaur', 'password' => 'venasaur' ]
    ];
    $username = $_POST['user_name'];
    $password = $_POST['password'];
    $userAuthentication = false;
    foreach($user_id as $user){
        if($username === $user['userID'] && $password === $user['password']){
            //echo 'username and password match!';
            $userAuthentication = true;
            $_SESSION['user'] = $username;
            $output = [
                'success' => true
            ];
            break;
        }
    }
    if(!$userAuthentication){
        $output = [
            'success' => false
        ];
    }
    $output_string = json_encode($output);
    print $output_string; //{"success":true}
?>