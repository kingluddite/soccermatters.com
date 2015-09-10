angular.module('mySeasonsCtrl', ['seasonService'])
  .controller('mySeasonsController', function(Season) {
    var vm = this;
    vm.pageTitle = "My Seasons";

    vm.processing = true;
    Season.all()
      .success(function(data) {

        // when all seasons come back, remove processing variable
        vm.processing = false;

        vm.mySeasons = data;
      });

    vm.deleteSeason = function(id) {
      vm.processing = true;
       console.log('yo');
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

  });
