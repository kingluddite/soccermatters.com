angular.module('smApp', [
    'app.routes',
    'ngAnimate',
    'authService',
    'userService',
    'mainCtrl',
    'mySeasonCtrl',
    'mySeasonsCtrl',
    'aboutCtrl',
    'homeCtrl',
    'registerCtrl',
    'schedulerCtrl',
    'teamCtrl',
    'soccerFieldService',
    'soccerFieldCtrl',
    'seasonService'
    ])

// app configuration to integrate token into requests
.config(function($httpProvider) {
    //attach auth interceptor to the http requests
    $httpProvider.interceptors.push('AuthInterceptor');
});









