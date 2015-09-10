// inject ngRoute for all our routing needs
angular.module('app.routes', ['ngRoute'])

// configure our routes
.config(function($routeProvider, $locationProvider) {
    $routeProvider

    // route for the home page
        .when('/', {
        templateUrl: 'app/views/pages/home.html',
        controller: 'homeController',
        controllerAs: 'home'
    })

    // route for the about page
    .when('/about', {
        templateUrl: 'app/views/pages/about.html',
        controller: 'aboutController',
        controllerAs: 'about'
    })

    // route for the seasons page
    .when('/seasons', {
        templateUrl: 'app/views/pages/seasons/all.html',
        controller: 'mySeasonsController',
        controllerAs: 'season'
    })

    // route for the individual season page
    .when('/seasons/:season_id', {
        templateUrl: 'app/views/pages/seasons/single.html',
        controller: 'mySeasonController',
        controllerAs: 'game'
    })

    // route for the about page
    .when('/teams', {
        templateUrl: 'app/views/pages/teams/team.html',
        controller: 'teamController',
        controllerAs: 'team'
    })

    // route for the about page
    .when('/scheduler', {
        templateUrl: 'app/views/pages/scheduler/scheduler.html',
        controller: 'schedulerController',
        controllerAs: 'scheduler'
    })

    // route for the about page
    .when('/register', {
        templateUrl: 'app/views/pages/register.html',
        controller: 'registerController',
        controllerAs: 'register'
    })

    // route for the about page
    .when('/login', {
        templateUrl: 'app/views/pages/login.html',
        controller: 'loginController',
        controllerAs: 'login'
    })

    // route for the about page
    .when('/gear', {
        templateUrl: 'app/views/pages/gear/gear.html',
        controller: 'gearController',
        controllerAs: 'gear'
    })

    // route for the about page
    .when('/fields', {
        templateUrl: 'app/views/pages/fields/field.html',
        controller: 'fieldController',
        controllerAs: 'field'
    })
    
    // fallback mechanism that applies to all requests that do not
    //  match the above predefined routes
    .otherwise({
        redirecTo: '/'
    });


    $locationProvider.html5Mode(true);
});
