var express = require('express');
var router = express.Router();

var path  = __dirname.split("\\");
var matchPath = "/" + path.slice(path.length-2).join("/");

router.get(matchPath, function(req, res) {
  //res.send('index -- 1 -- NEW ' + matchPath);
  res.render("../apps/app1/views/index",{title:"SUPPPPerereeere"});
});
	 
	
module.exports = router;
