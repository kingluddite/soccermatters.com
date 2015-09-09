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
  


  return apiRouter;
}
