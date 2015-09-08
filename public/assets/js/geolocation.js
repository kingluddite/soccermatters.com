function geoFindMe() {
  var yourField = document.getElementById("field");

  if (!navigator.geolocation){
    yourField.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    // https://github.com/occasl/mongodb-poc
    // https://loutilities.wordpress.com/2012/08/10/dogtag-app-in-30-minutes-part-1-node-js-and-mongodb/
    // http://blog.robertonodi.me/how-to-use-geospatial-indexing-in-mongodb-using-express-and-mongoose/
    
    // so the person arrives at a soccer field and they want to
    // publish the location using soccermatters share my field api
    // after they click the button they have to agree to share their
    // location and then we wait for a successs
    // once we get success, we post to my soccerfield API
    // which takes the geolocation long and lat
    // and posts it to the local soccermatters mongodb
    // we can also search by name (I will add a search box that will
    //   find a field by name)
    //  you can also find a field which will grab your geo location
    //  and find the closest field to you
     // you need to run, mongod on port 27017
     // you need to run nodemon on your express app
     // you need to run http-server on your local server
     // something like: http://localhost:8081/geolocate.html
    $.post( "http://localhost:8080/soccerfields", {latitude: latitude,
    longitude: longitude})
  .done(function( data ) {
    alert( "Data Loaded: " + data);
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
  
});
