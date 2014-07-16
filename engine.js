var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes_index = require('./routes/index');

var appEngine = {
	apps:[],
	appsToLoad: 0,
	appsLoaded: false,
	nop: function(){},
	executeAppsLoadedCallback: function(){
		(this.AppsLoadedCallback || this.nop)(this.createExpressApp());
	},
	appLoaded: function(){
		this.appsToLoad--;
		if(this.appsToLoad<=0){
			this.appsLoaded = true;
			this.executeAppsLoadedCallback();
		}
	},
	onAppsLoaded: function(callback){
		this.AppsLoadedCallback = callback;
		if(this.appsLoaded){
			this.AppsLoadedCallback(this.createExpressApp());
		}
	},
	startLoading: function (){
		var fs = require('fs');
		var path = "./apps/";
		var that = this;
		
		fs.readdir(path,function(){
			var files = arguments[1];
			that.appsToLoad = files.length;
			for(var idx in files){
				fs.stat(path + files[idx], function(filePath){
					return function(err, stat){
						if(stat.isDirectory()){
							that.apps[filePath.replace(/\./,"")] = require(filePath + "/index");
						}
						that.appLoaded();
					}
				}(path + files[idx]));
			}
		});
	},
	createExpressApp:function (){
		var app = express();
		
		app.set('env', process.env.APP_ENGINE_ENV);
		app.set('views', path.join(__dirname, 'views'));
		app.set('view engine', 'jade');

		app.use(favicon());
		app.use(logger('dev'));
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded());
		app.use(cookieParser());
		app.use(express.static(path.join(__dirname, 'public')));

		for(var idx in this.apps){
			app.use(this.apps[idx]);
			console.info("Loading App -> " + idx);
		}
		
		app.use('/', routes_index);
		
		// catch 404 and forward to error handler
		app.use(function(req, res, next) {
			var err = new Error('Not Found');
			err.status = 404;
			next(err);
		});

		// development will print stacktrace
		// production error handler
		// no stacktraces leaked to user
		app.use(function(err, req, res, next) {
			res.status(err.status || 500);
			res.render('error',  {
				message: err.message,
				error: (app.get('env') === 'development')?err:{}
			});
		});
		return app;
	}
};

module.exports = appEngine;
