var express = require('express');
var router = express.Router();

var code1 = Math.random().toString(36).replace(".","");
var code2 = Math.random().toString(30).replace(".","");

router.all("/", function(req, res, next) {
 
	var msg = "Unauthorized";
	res.setHeader("WWW-Authenticate", "Digest realm=\"" + code1 + "\", nonce=\"" + code2 + "\"");
	
	next({status:401,message:"401 " + msg + ".", title:msg});
});

module.exports = router;
