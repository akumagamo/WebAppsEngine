var express = require('express');
var router = express.Router();

var path  = __dirname.split("\\");
var matchPath = "/" + path.slice(path.length-2).join("/");

var fs = require('fs');
var util = require('util');
var ENCODING = "utf8";
var FILENAME = __dirname + "/last-query.txt";

function logLastRequest(req, res, next, properties){
	fs.writeFile(FILENAME, util.inspect(properties), ENCODING, {flags: 'w'}, 
		function(err){
			if(err != null)
				next(err);
			else{
				res.end();
			}
	});
}
router.all(matchPath + "*/lastquery", function(req, res, next) {
	fs.readFile(FILENAME, ENCODING ,function(err, data){
		if(err == null && data!="") {
			res.end(data);
		}
		else{
			next(new Error("No query"));
		}
	});
});
router.all(matchPath + "*", function(req, res, next) {
	var properties = [];
	for(var name in req.query){
		properties.push(req[name]||"unknown property: \""+ name + "\"");
	}
	if(properties.length==0){
		properties.push(req);
	}
	console.info(properties);
	logLastRequest(req, res, next, properties)
});
	 
module.exports = router;
