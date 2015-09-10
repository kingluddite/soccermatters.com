angular.module('mySeasonCtrl', [])
.controller('mySeasonController', function($http, $routeParams) {
        // console.log($routeParams.season_id);
    var seasonId = $routeParams.season_id;
    var vm = this;
    // vm.pageTitle = "My Season";

    $http.get('/api/seasons/' + seasonId)
      .then(function(data) {
        // bind the seasons we receive to vm.seasons
        vm.mySeasonGames = data.data.fullSeason;
      });

});
