<?php
/**
 * Created by PhpStorm.
 * User: Kenneth
 * Date: 3/23/2016
 * Time: 12:36 PM
 */
    session_start();
    $_SESSION = array(); //empties all the session information

    if(ini_get("session.use_cookies")){
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, //sets the time back for cookies for about half a day
            $params["path"], $param["domain"], $params["secure"], $params["httponly"]
        );
    }
    //destroy session
    session_destroy();
?>