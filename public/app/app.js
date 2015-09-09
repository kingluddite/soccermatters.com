angular.module('smApp', ['routerRoutes'])

.controller('mainController', function() {

    var vm = this;

    vm.pageTitle = "Soccermatters.com";
    vm.pageSlogan = "Because Soccer Does Matter";
})

// // home page controller
.controller('homeController', function() {
    var vm = this;

    vm.pageTitle = "Player Relationship Management (PRM)";
})

// // teams
.controller('teamController', function() {
    var vm = this;
    vm.pageTitle = "Teams";
})

.controller('seasonController', function() {
    var vm = this;
    vm.pageTitle = "Seasons";
})

.controller('aboutController', function() {
    var vm = this;
    vm.pageTitle = "About";
})

.controller('loginController', function() {
    var vm = this;
    vm.pageTitle = "Login";
})

.controller('registerController', function() {
    var vm = this;
    vm.pageTitle = "Register";
})

.controller('schedulerController', function() {
    var vm = this;
    vm.pageTitle = "Create A Season Schedule";
})

.controller('fieldController', function() {
    var vm = this;
    vm.pageTitle = "Find Or Share A Soccer Field";
});
