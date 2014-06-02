var express = require('express');
var router = express.Router();

var path  = __dirname.split("\\");
var matchPath = "/" + path.slice(path.length-2).join("/");

var fs = require('fs');
var ENCODING = "utf8";
var FILENAME = __dirname + "/caller-ip.txt";

router.get(matchPath, function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	fs.readFile(FILENAME, ENCODING ,function(err, data){
		if(err == null || data!="") {
			res.end(data);
		}
	});
});

router.put(matchPath, function(req, res, next) {
	var ipToSave = req.query.ip || req.connection.remoteAddress;
	fs.writeFile(FILENAME, ipToSave, ENCODING, {flags: 'w'}, 
	function(err){
		if(err != null)
			next(err);
		else{
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end();
		}
	});
});
	 
module.exports = router;

