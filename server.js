// BASE SETUP
// ==================================

// CALL THE PACKAGES ----------------
var express       = require('express'),
    app           = express(),
    bodyParser    = require('body-parser'), // get body-parser
    morgan        = require('morgan'), // used to see requests
    mongoose      = require('mongoose'), // db helper
    config        = require('./config')
    path          = require('path');
    // jwt           = require('jsonwebtoken');

/*=========================================
=            APP CONFIGURATION            =
=========================================*/

// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*----------  configure our app to handle CORS requests  ----------*/
// Cross-Origin Resource Sharing (CORS)
// allow requests from other domains to prevent CORS errors 
//   allows any domain to access our API
/*=====  End of APP CONFIGURATION  ======*/

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers',
    'X-Requested-With,content-type, Authorizartion');
  next();
})

/*----------  log all requests to the console  ----------*/
app.use(morgan('dev'));

// DB CONNECT
mongoose.connect(config.database);

// mongoose.connect('localhost:27017/soccermatters')

// set the public folder to server public assets
app.use(express.static(__dirname + '/public'));

// ROUTES FOR OUR API ====================
// =======================================

// API ROUTES
// var apiRoutes     = require('./app/routes/api')(app, express);
// app.use('/api', apiRoutes);

// MAIN CATCHALL ROUTE-------
// SEND USERS TO FRONTEND
// has to be registered AFTER API ROUTES
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

/*========================================
=            START THE SERVER            =
========================================*/

// START THE SERVER
// ================================== 
app.listen(config.port);
console.log('SoccerMatters! ' + config.port);
