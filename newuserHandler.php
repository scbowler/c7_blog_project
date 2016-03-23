<?php
/**
 * Created by PhpStorm.
 * User: Kenneth
 * Date: 3/22/2016
 * Time: 12:46 PM
 */
    session_start();
    require('MySQL_connect.php');

    $username = $_POST['user_name'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    $regex = [
        ['field'=>$username, 'regex'=>'/[a-zA-Z0-9]{3,16}/', 'error_message'=>'id must be a number between 2 and 5 digits long'],
        ['field'=>$email, 'regex'=>'/^\S+@\S+$/', 'error_message'=>'The email must be in a valid format'],
        ['field'=>$password, 'regex'=>'/[a-zA-Z0-9]{5,32}/', 'error_message'=>'name must be 3 letters or more']
    ];
    if(preg_match($regex[0]['regex'], $username) && preg_match($regex[1]['regex'], $email) && preg_match($regex[2]['regex'], $password)) {
        $query = "INSERT INTO `users` (`username`, `email`, `password`) VALUES ('$username', '$email', '$password')";
        $result = mysqli_query($connect, $query);
        $output = [
            'success' => true,
            'results' => $result
        ];
    } else {
        $output = [
            'success' => false
        ];
        if(!preg_match($regex[0]['regex'], $username)){
            $output['usernameMessage'] = 'Username must be 3 to 16 characters long.';
        }
        if(!preg_match($regex[1]['regex'], $email)){
            $output['emailMessage'] = 'Email must be in a valid format.';
        }
        if(!preg_match($regex[2]['regex'], $password)){
            $output['passwordMessage'] = 'Password must be alphanumeral characters between 5 to 32 characters long';
        }
    }
    $output_string = json_encode($output);
    //print_r($_POST);
    print($output_string);
    //echo $query;
?>