var express = require('express');
var router = express.Router();

var path  = __dirname.split("/");
var matchPath = "/" + path.slice(path.length-2).join("/");

var pg = require('pg');
var connectionString = "postgres://servicePostgres:postGres@localhost/nodetest";

function logLastRequest(req, res, next, request){
		
	pg.connect(connectionString, function(err, client, done){
		client.query("insert into logged_requests (request) values($1);", request,function(err, result){
			if(err != null)
				next(err);
			else{
				res.end();
			}
		});
	});
}
router.all(matchPath + "*/lastquery", function(req, res, next) {
		
	pg.connect(connectionString, function(err, client, done){

		client.query("select request from logged_requests order by updatetime desc LIMIT 1",[],function(err, result){
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

router.all(matchPath + "*", function(req, res, next) {
	logLastRequest(req, res, next, req.body)
});
	 
module.exports = router;
