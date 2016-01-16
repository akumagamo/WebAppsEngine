var express = require('express');
var router = express.Router();
var http = require("http");
var config = require('./config.js');

var path  = __dirname.split("/");
var matchPath = "/" + path.slice(path.length-2).join("/");
var viewBasePath = ".." + matchPath + "/views";

router.post(matchPath + "/:repo", function(req, res, next) {
	var repoName = req.params["repo"];
	console.info(repoName);
console.info(req.body);
	if(repoName){
		var branchInfo = config[repoName];
		if(req.body.ref && req.body.ref.indexOf(branchInfo.name)>-1){
			var forwardRequest = http.request(branchInfo.options, function(){});
			setTimeout(function(){
				forwardRequest.end();
				res.end("Y");
			},500);
		}else{
			res.end("N");
		}
	}else{
		res.end("N");
	}
});
	 
module.exports = router;

