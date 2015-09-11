#SM Notes

## MEAN microsoft tutorial
### Express (E)
makes working with node easier
MVC structure
web api
routes, views, logic organized

```javascript
npm install -g express
```

### MongoDB
10gen (formerly)
mongo DB3

User Document
```javascript
{
  "ID": 0,
  "username": "phil",
  "created_at": "date"
}
```
Post Document
```javascript
{
  "ID": 0,
  "created_by": "ObjectID(ref User)",
  "created_at": "date",
  "modified_at" "date",
  "text": "this is text!"
}
```

### MongoDB Binaries
* The following binaries are installed onto your machine
  * mongod - The db process
  * mongo - the mongodb CLI
  * mongoimport - A data import utility

Mongoose ODM
* Node.js driver - npm install mongodb --save
* Object Data Mapper - npm install mongoose --save

Implementing the User Route Handlers
* Getting the user document fro GET requests
* Creating a user document for POST requests

## Routing
* Create app with multiple views
* Must pass `ngRoute` module to app
* Detects url and uses the appropriate template

### Creating Partials
* Sections of the page to be rendered as-needed
* Rendered inside ng-view

## $http
* core angular service
* returns a promise with success and error callbacks
* `$http.get('/someUrl').success(successCallback);`
- $http.get
- $http.head
- $http.post
- $http.put
- $http.delete

$rootScope - scope available to entire module

### Redirecting the user
* Check the authentication status
* Use $location to change the URL and redirect user

## Services
Angular - helper functions for controllers
* organize logic
* persists data outside of controllers
* share data between controllers
* injected as you need them

* factory service
  * receive the value returned
  * useful for **reusing logic** different controller
  * 
* service
  * recieve a new instance of created object
  * useful for **sharing information** between objects
* provider
  * versatile but verbose
  * useful for an API that needs to be configured before app starts

$resource
* no need for manual $http interactions
* easiest way to interact with RESTful endpoints
* Requires the ngResource module

github repo
https://github.com/microsoftlearning/chirp

### Node
easy to create a server
simple_server.js
```javascript
// import http module
var http = require('http');

// create web server
http.createServer(function(req, res) {
  // callback executed when request is received
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Yo brother!\n');
}).listen(1337, '127.0.0.1');

console.log('server running at http://127.0.0.1:1337');
```
run above with:
`$ node simple_server.js`

### Express
A ROUTING framework that sits on top of node.js
Understanding Express
* provides higher-level 'Routing' functionality over the raw http server
* interact with HTTP requests and responses more easily with higher-level apis for headers and response bodies
* minimalistic, fast and unopinionated

so instead of creating our own server, express handles it for us
makes our APIs nicer
allows us to create this thing called 'Routing'

#### Node Package Manager
NPM
* command-line package manager for useful libraries
* akin to pip for python or gem for Ruby
* comes bundled with node.js installation

#### Package.json
* manifest for all required packages to run project
* specifies developer dependencies as well as production dependencies
* defines Entrypoint fo Cl Tests

**Express Routing Features**
* Create 'mini' routers for each major section in your api, linking the URL request with the code to handle it
* Easily implement RESTful conventions using ':' notation to specify models/objects base on URL
* Easily respond with all types of data such as JSON, xml etc

## Notes from HTML Field Location Share
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






















### Angular
SPA - Single Page App
URL changes
brings you to part of the page
faster


front end frameworks
framework - not a library
framework - structures out your application
jquery is not a framework - it is a library
* effects
* xhr requests easier

angular js = is more opinionated
jquery is not opinionated
angular is opinionated they have to decide how html should work to build web apps

#### Why use Angular?
* HTML redesigned to make use of modern tools (Futurefied!)
* Keep your code organized and structured
* two way data bindings
* great for SPAs
* Easy to test

other front end frameworks
React (call themselves the 'V' in MVC) (1 way data binding)
Ember (like ruby on rails)
Backbone (1 way data binding)

#### Directives
* Angular-only HTML attributes
* Attaches some specific behavior to the element
* usually begins with 'ng-' or 'data-ng'
  * data- (other frameworks use = more universal model)

#### Modules
* A container for your entire application
* var myModule = angular.module('myApp', []);
  * empty brackets [] is where you put your dependencies
    * other resources or libraries
  * myApp is what you will call your name in your view
  
#### Controllers
* Contains the business logic for a part of your application
* Sets up your data to be viewed in your HTML
* myModule.controller('myController', function($scope) {
* })

1.0
some.html
```html
<div ng-controller="HelloWorldController">
  <strong>{{message}}</strong>
</div>
```
```javascript
demoApp.controller('HelloWorldController', function($scope) {
  $scope.message = 'Hello World';
});
```

2.0
index.html
```html
<hello-world>
```

helloWorldTemplate.html
```html
<strong>{{message}}</strong>
```

helloWorldDirective.js
```javascript
demoApp.directive('helloWorld', function() {
  return {
    restrict: 'E',
    templateUrl: 'helloWorldTemplate.html',
    link: function(scope, element, attrs) {
      scope.message = 'Hello World';
    }
  }
})
```

## Controller this vs $scope
old
```javascript
myModule.controller('myController', function($scope) {
  // do stuff
});
```

new
```javascript
.angular.module('myCtrl', [])
  .controller('myController', function(Team) {
    var vm = this;
    // use vm everywhere now!
})
```
**note**
controllers just set up your data to be viewed in your html

#### Dependency Injection
* How we specify the dependencies that an Angular component will need
instead of throwing everything at the top
we break it up and say 'what do I specifically need for this particular module'

#### Templates
* the 'Angularized HTML we've created
* Used to render the View (what the end-user will see)

### Models and Data Binding
old way
$scope
* links your controller to your view (what the user sees)
* created through as an injectable parameter in controllers
* configured within controller logic
* contains the models for our data
### Displaying and Binding Data
* Display using handlebars {{ }}
* Bind data using directives:
  * ng-model for **two way data binding** (we'll use it)
  * ng-bind for one way data binding (faster but we won't use it)
  * 1 way good for displaying
  * 2 way good for user input
  * 


















































## bower
**get rid of bower_components directory**
https://css-tricks.com/whats-great-bower/

**connect bower npm install**
instead of npm install and bower install

package.json
```js
{
  "name": "routing-app",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "postinstall": "bower install"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bower": "^1.5.2",
    "express": "^4.13.3"
  }
}
```

bower.json
```
{
  "name": "angular_machine_routes",
  "version": "0.0.0",
  "license": "MIT",
  "ignore": [
    "**/.*",
    "node_modules",
    "bower_components",
    "test",
    "tests"
  ],
  "dependencies": {
    "angular-animate": "~1.4.5",
    "angular-route": "~1.4.5",
    "animate.css": "~3.4.0",
    "bootstrap": "~3.3.5",
    "font-awesome": "~4.4.0"
  }
}
```

.bowerrc
```
{
  "directory": "public/assets/libs"
}

```
gulp ENV
```javascript
gulp.task('set-dev-node-env', function() {
    return process.env.NODE_ENV = 'development';
});

gulp.task('set-prod-node-env', function() {
    return process.env.NODE_ENV = 'production';
});

// OR

// gulpfile.js

var gulp = require('gulp');
var nodemon = require('nodemon');
var env = require('gulp-env');

gulp.task('nodemon', function() {
    // nodemon server (just an example task)
});

gulp.task('set-env', function () {
  env({
    vars: {
      MONGO_URI: "mongodb://localhost:27017/testdb-for-british-eyes-only",
      PORT: 9001
    }
  })
});

gulp.task('default', ['set-env', 'nodemon'])
```
**test**
https://github.com/crystalschang/gulp-env


example of gulp saving to package.json
`$ npm install --save-dev gulp-plumber gulp-watch gulp-livereload gulp-minify-css`

