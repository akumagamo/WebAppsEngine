var express = require('express');
var router = express.Router();

var path  = __dirname.split("\\");
var matchPath = "/" + path.slice(path.length-2).join("/");
var viewBasePath = ".." + matchPath + "/views";

router.get(matchPath, function(req, res) {
	res.render(viewBasePath + "/index", {
		title: "This is a Template for creating Apps",
		body: "Here you can see the basic layout and structure of the AppsEngine Project."		
	});
});
	 
module.exports = router;

