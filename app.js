/**
 * This is a sample program that demonstrate how to salt & hash password using bcrypt, an adaptive hash function node.js library
 */

// Initialise express, consolidate & swig

var app = require('express')(),
	consolidate = require('consolidate'),
	routes = require('./handlers/routes'),
	error_handler = require('./handlers/error_handler'),
	body_parser = require('body-parser'),
	app_port = 8087;

app.engine('html', consolidate.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(error_handler.errorHandler);
app.use(body_parser.urlencoded({'extended':true}));
routes(app);

console.log('Express app is started at port '+app_port+' ...');
app.listen(app_port);