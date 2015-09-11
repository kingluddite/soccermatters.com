angular.module('soccerFieldCtrl', ['soccerFieldService'])

.controller('soccerFieldController', function(SoccerField, $http) {
  var vm = this;
  vm.pageTitle = "Soccer Fields";

  // Show all soccerfields
    SoccerField.all()
      .success(function(data) {
         
        // when all soccerfieldss come back, remove processing variable
        vm.processing = false;

        vm.mySoccerFields = data;
      });

    // Delete a soccerfields
    vm.deleteSoccerField = function(id) {
      vm.processing = true;
      // accepts the soccerfields id as a parameter
      SoccerField.delete(id)
         .success(function(data) {

          // get all users to update the table
          // you can also set up your api
          // to return the list of uses with the delete call
          SoccerField.all()
             .success(function(data) {
              vm.processing = false;
              vm.mySoccerFields = data;
             });
         });
    };

  // the jQuery to grab the field long + lat
  //   then takes that data and populates the db
  $(document).ready(function() {
    function geoFindMe() {
      var yourField = document.getElementById("field");

      if (!navigator.geolocation) {
        yourField.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
      }

      function success(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        // $http.get("/api/soccerfields");
        $.post("/api/soccerfields", {
            latitude: latitude,
            longitude: longitude
          })
          .done(function(data) {
            console.log("Data Loaded: " + data);
          }).fail(function() {
            console.log("fail: you screwed something up")
          });

        yourField.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

        var img = new Image();
        img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

        yourField.appendChild(img);
      };

      function error() {
        yourField.innerHTML = "Unable to retrieve your location";
      };

      yourField.innerHTML = "<p>Locating…</p>";

      navigator.geolocation.getCurrentPosition(success, error);
    }

    $('#shareMyField').on('click', function(evt) {
      geoFindMe();
    });
  });
});
