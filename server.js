// BASE SETUP
// ==================================

// CALL THE PACKAGES ----------------
var express      = require('express'),
    path         = require('path'),
    favicon      = require('serve-favicon'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'), // get body-parser
    // morgan       = require('morgan'), // used to see requests
    mongoose     = require('mongoose'), // db helper
    compress     = require('compress'),
    config       = require('./config');

// default to DEV environmetn
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

    /*======================================
    =            AUTHENTICATION            =
    ======================================*/    
    // passport     = require('passport'),
    // session      = require('express-session'),
    // authenticate = require('./routes/authenticate')(passport);
    // jwt          = require('jsonwebtoken');

/*=========================================
=            APP CONFIGURATION            =
=========================================*/

// check that MongoD is running...
// require('net').connect(27017, 'localhost').on('error', function() {
//     console.log("You forgot to start MonGOD or mongo-D or whatever the hell that thing is called!");
//     process.exit(0);
// });

/*==============================
=            ROUTES            =
==============================*/
// loading routes defined in the /routes folder
// var routes = require('./routes/index');
// var authenticate = require('./routes/authenticate')(passport);

/*==========================
=            DB            =
==========================*/


/*===================================
=            APP DEFINED            =
===================================*/
var app = express();
// app.set('view engine', 'jade');
// development only
if ('development' == app.get('env')) {
  // app.set('mongodb_uri', 'mongo://localhost/dev');
  mongoose.connect(config.database);
}

// production only
if ('production' == app.get('env')) {
  mongoose.connect(process.env.MONGO_URL);
}

/*===============================
=            FAVICON            =
===============================*/
// TODO - figure out how this works
// app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.ico')));

// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({
    extended: true
}));
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
});
app.use(cookieParser());

// set the public folder to serve public assets
app.use(express.static(path.join(__dirname, 'public')));

// needs to be passport.initialize first
//  and then passport.session second
//  if you reverse, it will choke the app
// app.use(passport.initialize());
// app.use(passport.session());

// insert middleware that points to our route definitions

// // Intialize Passport
// var initPassport = require('./passport-init');
// initPassport(passport);

/*----------  log all requests to the console  ----------*/
// if (process.env.NODE_ENV === 'development') {
  /*----------  log all requests to the console  ----------*/
  // app.use(morgan('dev'));
// } else if (process.env.NODE_ENV === 'production') {
  // app.use(compress());
// }

// API ROUTES
var apiRoutes     = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);
  /*==============================
=            FIELDS            =
==============================*/

  // on routes that in in /fields
  // ------------------------------------------------------------ 


// MAIN CATCH-ALL ROUTE-------
// SEND USERS TO FRONTEND
// has to be registered AFTER API ROUTES
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

/*======================================
=            ERROR HANDLING            =
======================================*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

/*========================================
=            START THE SERVER            =
========================================*/

// START THE SERVER
// ==================================
app.listen(config.port);
console.log('SoccerMatters! ' + config.port);
