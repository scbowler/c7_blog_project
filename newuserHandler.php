<?php
/**
 * Created by PhpStorm.
 * User: Kenneth
 * Date: 3/22/2016
 * Time: 12:46 PM
 */
    session_start();
    //call query from mySQL server.
    require('MySQL_connect.php');

    $username = $_POST['user_name'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    $query = "INSERT INTO `users` (`username`, `email`, `password`) VALUE ($username, $email, $password)";
    $result = mysqli_query($connect, $query);

    print_r($_POST);
?>