var express = require('express');
var router = express.Router();

var path  = __dirname.split("\\");
var matchPath = "/" + path.slice(path.length-2).join("/");

router.get(matchPath, function(req, res) {
  //res.send('index -- 1 -- NEW ' + matchPath);
  res.render("../apps/app1/views/index",{title:"SUPPPPerereeere"});
});
	 
	
module.exports = router;


/*

var http = require('http');
var fs = require('fs');
var ENCODING = "utf8";
var FILENAME = "";

http.createServer(function (req, res) {
  fs.readFile(FILENAME, ENCODING ,function(err, data){
	if(err != null || data!=req.connection.remoteAddress) {
		fs.writeFile(FILENAME, req.connection.remoteAddress, ENCODING, 
		{flags: 'w'}, function(){
			res.end("NEW");
		});
	}else{
		res.end("OLD");
	}
	res.writeHead(200, {'Content-Type': 'text/plain'});
  });
}).listen(8080);

*/
