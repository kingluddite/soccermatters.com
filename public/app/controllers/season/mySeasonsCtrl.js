angular.module('mySeasonsCtrl', ['seasonService'])
  .controller('mySeasonsController', function(Season) {
    var vm = this;
    vm.pageTitle = "My Seasons";

    vm.processing = true;

    // Show all seasons
    Season.all()
      .success(function(data) {

        // when all seasons come back, remove processing variable
        vm.processing = false;

        vm.mySeasons = data;
      });

    // Delete a season
    vm.deleteSeason = function(id) {
      vm.processing = true;

      // accepts the season id as a parameter
      Season.delete(id)
         .success(function(data) {

          // get all users to update the table
          // you can also set up your api
          // to return the list of uses with the delete call
          Season.all()
             .success(function(data) {
              vm.processing = false;
              vm.mySeasons = data;
             });
         });
    };

    // I used the code below before I used factories
    // $http.get('/api/seasons')
    //   .then(function(data) {
    //     // bind the seasons we receive to vm.seasons
    //     vm.mySeasons = data.data;
    //     // console.log(vm.mySeasons);
    //   });

  })


  // controller applied to edit a season title
  .controller('seasonsEditController', function($routeParams, Season) {
    var vm = this;

    Season.get($routeParams.season_id)
      .success(function(data) {
        vm.seasonData = data;
      });

      // function to save the season
    vm.saveSeason = function() {
      vm.processing = true;
      vm.message = '';
      

      // call the seasonService function to update
      Season.update($routeParams.season_id, vm.seasonData)
        .success(function(data) {
          vm.processing = false;
    // console.log('yo');

          // clear the form
          vm.userData = {};

          // bind the message from our API to vm.message
          vm.message = data.message;
        });
    }

  });
