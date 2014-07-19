var express = require('express');
var router = express.Router();
var http = require("http");
var config = require('./config.js');

var path  = __dirname.split("/");
var matchPath = "/" + path.slice(path.length-2).join("/");
var viewBasePath = ".." + matchPath + "/views";

router.get(matchPath + "/:repo", function(req, res, next) {
	var repoName = req.params["repo"];
	console.info(repoName);
	if(repoName){
		var branchInfo = config[repoName];
		if(req.body.ref && req.body.ref.indexOf(branchInfo.name)>-1){
			var forwardRequest = http.request(branchInfo.options, function(){});
			setTimeout(function(){
				forwardRequest.end();
				req.end("Y");
			},500);
		}
	}else{
		req.end("N");
	}
});
	 
module.exports = router;

