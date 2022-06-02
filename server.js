require('dotenv').config();
// ///////////////////////////
// Load the Required Modules
// ///////////////////////////

var bodyParser = require('body-parser');
var session = require('express-session');

var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session'); // require cookie session
// App the Express Webserver
var urlencodedParser = bodyParser.urlencoded({ extended: false })  
var app = express();
// var Globlesession;
// ///////////////////////////
// Allow Enviroment PORT Variable default to 3000
// ///////////////////////////
app.set('port', process.env.PORT || 8000);
app.use(cors())
// ///////////////////////////
// Set some Global Variables
// ///////////////////////////
// app.locals.siteTitle = 'Go Aver Integration';
app.use(express.static(__dirname + '/public'));
global.__basedir = __dirname;

app.use(urlencodedParser);
app.use(express.json());
app.use(cookieParser());

// set up the cookie for the session
app.use(cookieSession({
  name: 'session',                              // name of the cookie
  secret: 'MAKE_THIS_SECRET_SECURE',            // key to encode session
  maxAge: 24 * 60 * 60 * 1000,                  // cookie's lifespan
  sameSite: 'lax',                              // controls when cookies are sent
  path: '/',                                    // explicitly set this for security purposes
  secure: process.env.NODE_ENV === 'production',// cookie only sent on HTTPS
  httpOnly: true                                // cookie is not available to JavaScript (client)
}));


// include routes files

const userModuleRoutes = require('./app/routes/user');
/*const indexRoutes = require('./app/routes/index');
const addressRoutes = require('./app/routes/address');
const purchaseRoutes = require('./app/routes/purchase');
const waitingRoutes = require('./app/routes/waiting');*/

// ///////////////////////////
// Controllers or Routes
// ///////////////////////////
app.use(userModuleRoutes);/*
app.use(indexRoutes);
app.use(addressRoutes);
app.use(purchaseRoutes);
app.use(waitingRoutes);*/

// ///////////////////////////
// Setup Server to start listening.
// ///////////////////////////
var server = app.listen(app.get('port'), function() {
	console.log('Listening on port ' + app.get('port'));
});
