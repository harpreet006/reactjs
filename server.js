require('dotenv').config();

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
app.set('port', process.env.PORT || 8000);
app.use(cors({ credentials:true, origin:'http://localhost:3000' })) 
app.use(express.static(__dirname + '/public'));
global.__basedir = __dirname;
app.use(urlencodedParser);
app.use(express.json());
const userModuleRoutes = require('./app/routes/user'); 
 

// ///////////////////////////
// Controllers or Routes
// ///////////////////////////
app.use(userModuleRoutes);/*
 

// ///////////////////////////
// Setup Server to start listening.
// ///////////////////////////
*/
var server = app.listen(app.get('port'), function() {
	console.log('Listening on port ' + app.get('port'));
});
