var express = require('express');
var router = express.Router();

var path  = __dirname.split("/");
var matchPath = "/" + path.slice(path.length-2).join("/");

var cmdWorker = require("./cmdWorker.js");

var viewBasePath = ".." + matchPath + "/views";

router.put(matchPath, function(req, res) {
	cmdWorker.do(function(body){
		res.render(viewBasePath + "/index", {
			title: "Mini Continuous Deployment Tool!",
			body: body		
		});
	});
});
	 
module.exports = router;

