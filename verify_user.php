<?php
    session_start();
    if (empty($_SESSION['user'])) {
        http_response_code(401);
        exit();
    } else {
        $username = $_SESSION['user'];
        $query = "SELECT `ID` FROM `users` WHERE `active` = 1 AND `username`='$username'";
        $result = mysqli_query($connect, $query);
        $row = mysqli_fetch_assoc($result);
        if (!$row) {
            http_response_code(401);
            exit();
        } else {
            $userId = $row['ID'];
            unset($query, $result, $row);
        }
    }
?>