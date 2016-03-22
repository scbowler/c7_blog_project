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
    $query = "SELECT * FROM `users` WHERE 1";
    $result = mysqli_query($connect, $query);
    while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
        $userInformation[] = $row;
    }
    //print_r($userInformation);
    $username = $_POST['user_name'];
    $password = $_POST['password'];
    $userAuthentication = false;
    foreach($userInformation as $user){
        if($username === $user['username'] && $password === $user['password']){
            $userAuthentication = true;
            $_SESSION['user'] = $username;
            $output = [
                'success' => true
            ];
            break; //break to stop searching through forloop once found
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