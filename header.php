<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Story Press</title>

    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">

    <!-- jQuery library -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>

    <!-- Latest compiled JavaScript -->
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>

    <!-- AngularJS -->
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular-route.min.js"></script>

    <script src="angularApp.js"></script>
    <script src="controllers.js"></script>
    <script src="landingPage.js"></script>

    <link href='https://fonts.googleapis.com/css?family=Quando|Source+Sans+Pro:400,700,400italic' rel='stylesheet' type='text/css'>

    <link rel="stylesheet" text="text/css" href="style.css">

</head>
<body  ng-app="storyPress">

<header>
    <div class="container header-container">
        <div id="title">
            <!--temp title or maybe no-->
            <img src="images/storypresslogo.png" src="logo">
            <!--come up with better tag line-->
            <div class="subtitle">Come up with a prompt, or write a story based on one!</div>
        </div>
        <div class="user-menu">
            <div class="user-menu-name" ng-controller="userProfileController as uc">
                <span ng-show="uc.loggedIn">{{ uc.userData.name }} <span class="glyphicon glyphicon-triangle-bottom"></span></span>
                <span ng-hide="uc.loggedIn"><a href="#login">Log In</a></span>

            </div>
            <ul ng-show="uc.loggedIn">
                <a href="#"><li>Write Prompt</li></a>
                <a href="#"><li>Account</li></a>
                <a href="#"><li>Logout</li></a>
            </ul>
        </div>
    </div>
</header>

<div class="main-container">