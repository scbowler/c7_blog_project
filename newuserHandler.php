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

    $query = "INSERT INTO `users` (`username`, `email`, `password`) VALUES ('$username', '$email', '$password')";
    $result = mysqli_query($connect, $query);

    $output = [
        'success'=>true,
        'results'=>$result
    ];
    $output_string = json_encode($output);
    //print_r($_POST);
    print($output_string);
    //echo $query;
?>