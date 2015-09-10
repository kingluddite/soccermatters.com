angular.module('seasonService', [])

.factory('Season', function($http) {

  // create a new object = {}
  var seasonFactory = {};

  // get a single season
  seasonFactory.get = function(id) {
    return $http.get('/api/seasons/' + id);
  };

  // get all seasons
  seasonFactory.all = function() {
    return $http.get('/api/seasons/');
  };

  // create a season
  seasonFactory.create = function(seasonData) {
    return $http.post('/api/seasons/', seasonData);
  };

  // update a season
  seasonFactory.update = function(id, seasonData) {
    return $http.put('/api/seasons/' + id, seasonData);
  };

  // delete a season
  seasonFactory.delete = function(id) {
    return $http.delete('/api/seasons/' + id);
  };

  // return our entire seasonFactory object
  return seasonFactory;

});
