angular.module('mySeasonsCtrl', [])
.controller('mySeasonsController', function($http) {
    var vm = this;
    vm.pageTitle = "My Seasons";

    $http.get('/api/seasons')
      .then(function(data) {
        // bind the seasons we receive to vm.seasons
        vm.mySeasons = data.data;
        // console.log(vm.mySeasons);
      });

});
