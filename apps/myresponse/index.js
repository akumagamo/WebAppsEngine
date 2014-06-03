var express = require('express');
var router = express.Router();

var path  = __dirname.split("\\");
var matchPath = "/" + path.slice(path.length-2).join("/");

router.all(matchPath + "*", function(req, res, next) {
	var properties = [];
	for(var name in req.query){
		properties.push(req[name]||"unknown property: \""+ name + "\"");
	}
	if(properties.length==0){
		properties.push(req);
	}
	console.info(properties);
	res.send();
});
	 
module.exports = router;
