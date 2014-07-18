var express = require('express');
var router = express.Router();

var path  = __dirname.split("/");
var matchPath = "/" + path.slice(path.length-2).join("/");

var pg = require('pg');
var connectionString = require("../shared-config.js").connectionString;
var DB_QUERY_SELECT = "SELECT request FROM logged_requests ORDER BY updatetime DESC ;";
var DB_QUERY_INSERT = "INSERT INTO logged_requests (request) VALUES($1);";

function logLastRequest(req, res, next, request){
	pg.connect(connectionString, function(err, client, done){
		client.query(DB_QUERY_INSERT, [request],function(err, result){
			if(err != null)
				next(err);
			else{
				res.end();
			}
		});
	});
}
router.all(matchPath + "*/lastrequest", function(req, res, next) {
	pg.connect(connectionString, function(err, client, done){
		client.query(DB_QUERY_SELECT, function(err, result){
			data = result.rows[0].request;

			if(err == null && data!="") {
				res.end(data);
			}
			else{
				next(new Error("No query"));
			}
		});
	});
});

router.all(matchPath + "*/allrequests", function(req, res, next) {
	pg.connect(connectionString, function(err, client, done){
		client.query(DB_QUERY_SELECT, function(err, result){

			if(err == null) {
				var message = "";
				for(var idx = 0; idx < result.rows.length;idx++){
					message += result.rows[idx].request + ", ";
				}
				if(message.length>3){
					message = message.substr(0, message.length-2);
				}

				res.end("[" + message + "]");
			}
			else{
				next(new Error("No query"));
			}
		});
	});
})

router.all(matchPath + "*", function(req, res, next) {
	// QUICK TEST 
	
	console.info(req.body.ref);
	
	if(req && req.body && req.body.ref && req.body.ref.indexOf("refs/heads/current")>-1){
		var http= require("http");
		var options = {hostname:"81.217.115.67",port:8080, path:"/apps/heroku", method:"PUT"};
		var asyncReq = http.request(options, function(res){

		});
		setTimeout(function(){
			console.info("ENDE");
			logLastRequest(req, res, next, req.body);
			console.info("LOG");
			asyncReq.end();
			
		},500);
	}else{
		logLastRequest(req, res, next, req.body);	
	}
});

module.exports = router;
