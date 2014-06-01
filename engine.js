var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var  apps = {"/":routes, "/users":users};

function init(){
	var fs = require('fs');
	var path = "./apps/";
	
	fs.readdir(path,function(){
	var files = arguments[1];
	for(var idx in files){
		fs.stat(path + files[idx], function(filePath){
			return function(err, stat){
				if(stat.isDirectory()){
					apps[filePath.replace(/\./,"")] = require(filePath + "/index");
				}
			}
		}(path + files[idx]));
	}
});

}

function getApplication(){
	// view engine setup
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');

	app.use(favicon());
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded());
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, 'public')));

	console.info("Loading Apps: ");
	for(var idx in apps){
		app.use(apps[idx]);
		console.info(" -> " + idx);
	}
	
	/// catch 404 and forward to error handler
	app.use(function(req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	/// error handlers

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

	return app;
}

module.exports = {init:init, getApplication:getApplication};
