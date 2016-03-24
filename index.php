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
    <script src="storyWrite.js"></script>
    <script src="promptWrite.js"></script>

    <link href='https://fonts.googleapis.com/css?family=Quando|Source+Sans+Pro:400,700,400italic' rel='stylesheet' type='text/css'>

    <link rel="stylesheet" text="text/css" href="style.css">

</head>

<body  ng-app="storyPress">
<?php
    include 'header.php';
?>

<ng-view></ng-view>


<?php
    include 'footer.php';
?>
</body>
</html>