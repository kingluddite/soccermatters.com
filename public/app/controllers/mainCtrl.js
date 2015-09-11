angular.module('mainCtrl', [])
.controller('mainController', function($rootScope, $location, Auth) {

    var vm = this;

    // vm.pageTitle = "Soccermatters.com";
    vm.pageSlogan = "Because Soccer Does Matter";
    // get info if person is logged in
    vm.loggedIn = Auth.isLoggedIn();

    // get user information on route change
    $rootScope.$on('$routeChangeStart', function() {
      vm.loggedIn = Auth.isLoggedIn();

      // get user information on route change
      Auth.getUser().then(function(data) {
        vm.user = data;
      }, function(response) {
          // handle case where user not logged in
          // or http request fails
          
      });
        // .success(function(data) {
        //   vm.user = data;
        // });
    });

    // function to handle login form
    vm.doLogin = function() {
      vm.processing = true;

      // clear the error
      vm.error = '';


      // call the Auth.login() function
      Auth.login(vm.loginData.username, vm.loginData.password)
        .success(function(data) {
          vm.processing = false;
           
           if (data.success) {  
            // if a user successfully logs in, redirect to users page
            $location.path('/scheduler');
           } else {
            vm.error = data.message;
           }
        });
    };

    // function to handle logging out
    vm.doLogout = function() {
      Auth.logout();
      // reset all user info
      vm.user = {};
      $location.path('/login');
    };

    vm.createSample = function() {
    Auth.createSampleUser();
  };


});
