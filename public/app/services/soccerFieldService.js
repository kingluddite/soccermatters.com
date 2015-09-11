angular.module('soccerFieldService', [])

.factory('SoccerField', function($http) {

  // create a new object = {}
  var soccerFieldFactory = {};

  // get a single soccerField
  soccerFieldFactory.get = function(id) {
    return $http.get('/api/soccerfields/' + id);
  };

  // get all soccerfields
  soccerFieldFactory.all = function() {
    return $http.get('/api/soccerfields/');
  };

  // create a soccerField
  soccerFieldFactory.create = function(soccerFieldData) {
    return $http.post('/api/soccerfields/', soccerFieldData);
  };

  // update a soccerField
  soccerFieldFactory.update = function(id, soccerFieldData) {
    return $http.put('/api/soccerfields/' + id, soccerFieldData);
  };

  // delete a soccerField
  soccerFieldFactory.delete = function(id) {
    return $http.delete('/api/soccerfields/' + id);
  };

  // return our entire soccerField object
  return soccerFieldFactory;

});
