var Season = require('../models/Season');
module.exports = function(app, express) {

  // get instance of the express router
  var apiRouter = express.Router();

  apiRouter.use(function(req, res, next) {
    console.log('Somebody is knocking!');
    next();
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
        season.title = req.season.title;
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
  


  return apiRouter;
}
