<?php
/**
 * Created by PhpStorm.
 * User: Kenneth
 * Date: 3/21/2016
 * Time: 8:08 PM
 */
    session_start();
    //call query from mySQL server.
    $user_id = [
        ['id'=> 1, 'userID' => 'bulbasaur', 'password' => 'venasaur' ]
    ];
    $username = $_POST['name'];
    $password = $_POST['password'];

    foreach($user_id as $user){
        if($username === $user['id']){
            
        }
    }

?>