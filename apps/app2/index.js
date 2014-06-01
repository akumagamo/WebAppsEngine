var express = require('express');
var router = express.Router();

var path  = __dirname.split("\\");
var matchPath = "/" + path.slice(path.length-2).join("/");

router.get(matchPath, function(req, res) {
  res.send('index -- 2 -- NEW ' + matchPath);
});
	 
	
module.exports = router;
