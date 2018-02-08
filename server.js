// server.js

// modules =================================================
var express        = require('express');
var path           = require('path')
var app            = express();
var bodyParser     = require('body-parser');
var request        = require('request');
var methodOverride = require('method-override');
var yelpApi        = require('./assets/js/yelp');


// configuration ===========================================

// config files
// var db = require('./config/db');

// set our port
var port = process.env.PORT || 8080;

// connect to our mongoDB database
// (uncomment after you enter in your own credentials in config/db.js)
// mongoose.connect(db.url);

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
// app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(path.join(__dirname, 'app')));
app.use(express.static(path.join(__dirname, 'assets')));

// routes ==================================================
// require('./app/routes')(app); // configure our routes

var router = express.Router();

// all requests
router.use(function(req, res, next) {
	// if we need some middleware
	// console.log('doing work');
	next();
});

// backend route to assist app with getting data from yelp
app.post('/api/yelp', function(req, res) {
	return yelpApi.getYelpData(req, res);
});

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// shoutout to the user
console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;
