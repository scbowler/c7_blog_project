<?php
/**
 * Created by PhpStorm.
 * User: Kenneth
 * Date: 3/22/2016
 * Time: 10:05 AM
 */
$connect = mysqli_connect('url', 'username', 'password', 'database');
if(mysqli_connect_errno()){
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
?>