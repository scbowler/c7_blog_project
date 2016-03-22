<?php
/**
 * Created by PhpStorm.
 * User: Kenneth
 * Date: 3/22/2016
 * Time: 1:16 PM
 */
    session_start();
    //call query from mySQL server.
    require('MySQL_connect.php');
    $query = "SELECT * FROM `users` WHERE 1";
    $result = mysqli_query($connect, $query);
    while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
        $userInformation[] = $row;
    }
    print_r($userInformation);
?>