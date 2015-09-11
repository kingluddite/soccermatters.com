var User        = require('../models/User'),
    Season      = require('../models/Season'),
    bodyParser  = require('body-parser'),
    SoccerField = require('../models/SoccerField');

// needed for creating tokens
var jwt         = require('jsonwebtoken');
var config      = require('../../config');
var superSecret = config.secret;

module.exports = function(app, express) {

  /*----------  get an instance of the express router  ----------*/
  var apiRouter = express.Router();

  // route to generate sample user
  apiRouter.post('/sample', function(req, res) {

    // look for the user named chris
    User.findOne({ 'username': 'luke' }, function(err, user) {

      // if there is no chris user, create one
      if (!user) {
        var sampleUser = new User();

        sampleUser.name = 'Luke';  
        sampleUser.username = 'luke'; 
        sampleUser.password = 'leonardo';

        sampleUser.save();
      } else {
        console.log(user);

        // if there is a chris, update his password
        user.password = 'supersecret';
        user.save();
      }

    });

  });


  // route for authenticating a user
  // POST http://domain/api/authenticate
  apiRouter.post('/authenticate', function(req, res) {

    // first let's find the user
    //  then select the name, username and password explicitly
    User.findOne({
      username: req.body.username
    }).select('name username password').exec(function(err, user) {

      if (err) throw err;

      // no user with that username was found
      if (!user) {
        res.json({
          success: false,
          message: 'Authentication failed. User not found.'
        });
      } else if (user) {

        // check if password matches
        var validPassword = user.comparePassword(req.body.password);
        if (!validPassword) {
          res.json({
            success: false,
            message: 'Authentication failed. Wrong password.'
          });
        } else {

          // if user if found and password is right
          // create a token
          var token = jwt.sign({
            name: user.name,
            username: user.username
          }, superSecret, {
            expiresInMinutes: 1440 // expires in 24 hours
          });

          // return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        }
      }
    });
  });

  // middleware to verify a token

  apiRouter.use(function(req, res, next) {
    // do logging
    console.log('Somebody is knocking... should we let them in?');

    // authenticate users here
    
    // check header or url parameters or post parameter for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

      // verifies secret and checks exp
      jwt.verify(token, superSecret, function(err, decoded) {
        if (err) {
          return res.status(403).send({
            success: false,
            message: 'Failed to authenticate token.'
          });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;

          next(); // make sure we go to the next routes and don't stop there
        }
      });
    
    } else {
      
      // if there is no token
      //  return an HTTP response of 403 (access forbidden) and and error
      //  message
      res.status(403).send({
        success: false,
        message: 'No token provided.'
      });
    }

  });

  // set the /api to show json
  apiRouter.get('/', function(req, res) {
    res.json({ message: 'Welcome to the SoccerMatters API'});
  });

  /*=============================
  =            USERS            =
  =============================*/

  /* routes that end in /users */
  
  apiRouter.route('/users') 
  
  // let's create a user
  //  accessed via POST http://domain/api/users
  .post(function(req, res) {
    // create a new instance of the User model
    var user = new User();

    // set the users information comes from the request)
    user.name     = req.body.name;
    user.username = req.body.username;
    user.password = req.body.password;

    // save the user and check for errors
    user.save(function(err) {
      // we have a duplicate entry
      if (err) {
        if (err.code === 11000) {
          return res.json({
            success: false,
            message: 'A user with that username already exists.'
          });
        } else {
          return res.send(err);
        }
      }

      res.json({
        message: 'User created!'
      });
    });
  })

  // get all users
  //  accessed via GET http://domain/api/users/:user_id
  .get(function(req, res) {
    User.find(function(err, users) {
      if (err) {
        res.send(err);
      }
      // return the users
      res.json(users);
    });
  });

  // get a single user
  // on routes that end in /users/:user_id
  // ------------------------------------------------------------
  apiRouter.route('/users/:user_id')

  // get the user with that id
  //   accessed via GET http://domain/api/users/:user_id
  .get(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if (err) {
        res.send(err);
      }

      // return that user
      res.json(user);
    });
  })

  // update a single user with this id
  //    accessed via PUT http://domain/api/users/:user_id
  .put(function(req, req) {

    // use our user model to find the user we want
    User.findById(req.params.user_id, function(err, user) {

      if (err) {
        res.send(err);
      }

      // update the users info only if it's new
      if (req.body.name) {
        user.name = req.body.name;
      }
      if (req.body.username) {
        user.username = req.body.username;
      }
      if (req.body.password) {
        user.password = req.body.password;
      }

      // save the user
      user.save(function(err) {
        if (err) {
          res.send(err);
        }

        // return a message
        res.json({
          message: 'User updated!'
        });
      });
    });
  })

  // obviously this will delete a user
  .delete(function(req, res) {
    User.remove({
      _id: req.params.user_id
    }, function(err, user) {
      if (err) {
        return res.send(err);
      }

      res.json({
        message: 'Successfully deleted'
      });
    });
  }); 

  /*===============================
  =            SEASONS            =
  ===============================*/

  apiRouter.route('/seasons')

  .post(function(req, res) {
    // create a new instance of the Season model
    var season = new Season();
    // console.log(req.body.fullSeason);
    season.fullSeason = req.body.fullSeason;

    season.save(function(err) {
      if (err) {
        if (err.code === 11000) {
          return res.json({
            success: false,
            message: 'Something bad happened. You did it.'
          });
        } else {
          return res.send(err);
        }
      }

      res.json({
        message: 'Season created!'
      });
    });
    // console.log(req.body.season);

  })

  // GET ALL Seasons
  // (accessed at GET http://localhost:8080/api/users)
  .get(function(req, res) {
    Season.find(function(err, seasons) {
      if (err) {
        res.send(err);
      }
      // return the seasons
      res.json(seasons);
    });
  });

  // GET A SINGLE Season
  // on routes that end in /users/:user_id
  // ------------------------------------------------------------ 
  apiRouter.route('/seasons/:season_id')

  // get the user with that id
  // (accessed at GET http://localhost:8080/api/users/:user_id)
  .get(function(req, res) {
    Season.findById(req.params.season_id, function(err, user) {
      if (err) {
        res.send(err);
      }

      // return that user
      res.json(user);
    });
  })

  // Update a single season with this id
  .put(function(req, res) {

    // use our season model to find the season we want
    Season.findById(req.params.season_id, function(err, season) {

      if (err) {
        res.send(err);
      }

      // update the season's info only if it is new
      if (req.body.title) {
        season.title = req.body.title;
      }

      // save the season
      season.save(function(err) {
        if (err) {
          res.send(err);
        }

        // return a message
        res.json({
          message: 'Season updated!'
        });
      });
    });
  })

  // delete a season
  .delete(function(req, res) {
    Season.remove({
      _id: req.params.season_id
    }, function(err, season) {
      if (err) {
        return res.send(err);
      }

      res.json({
        message: 'Successfully deleted Season'
      });
    });
  });

  /*==============================
   =            FIELDS            =
   ==============================*/


  apiRouter.route('/soccerfields')

    // post new field location
    .post(function(req, res) {
      // console.log(req.body.latitude);
      // create a new instance of the Season model
      var soccerField = new SoccerField();
     //  // console.log(req.body.fullSeason);
      soccerField.longitude = req.body.longitude;
      soccerField.latitude = req.body.latitude;
     //  // soccerField.description = req.body.description;


     soccerField.save(function(err) {
        if (err) {
          if (err.code === 11000) {
            return res.json({
              success: false,
              message: 'Something bad happened. You did it.'
            });
          } else {
            return res.send(err);
          }
        }

        res.json({
          message: 'Soccerfield created!'
        });
      });

    })
    // GET ALL Fields
    // (accessed at GET http://localhost:8080/api/fields)
    .get(function(req, res) {

      SoccerField.find(function(err, soccerfields) {
        if (err) {
          res.send(err);
        }
        // return the seasons
        res.json(soccerfields);
      });
    });

    // api endpoint to get user information
    apiRouter.get('/me', function(req, res) {
      res.send(req.decoded);
    });


  return apiRouter;
}
