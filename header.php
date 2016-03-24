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
                {{ uc.userData.name }} <span class="glyphicon glyphicon-triangle-bottom"></span>
<!--                <span ng-hide="uc.loggedIn"><a href="#login">Log In</a></span>-->

            </div>
            <ul>
                <a href="#promptWrite"><li>Write Prompt</li></a>
                <a href="#"><li>Account</li></a>
                <a href="#"><li>Logout</li></a>
            </ul>
        </div>
    </div>
</header>

<div class="main-container">