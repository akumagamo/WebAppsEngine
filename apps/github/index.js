var appsHelper = require('../apps-helper')(__dirname);
var router = appsHelper.router;
var matchPath = appsHelper.matchPath;

var http = require("http");
var config = require('./config.js');

router.post(matchPath + "/:repo", function(req, res, next) {
	var repoName = req.params["repo"];
//	console.info(repoName);
	if(repoName){
		var branchInfo = config[repoName];
//console.info("0");
//console.info(req.body.ref);
//console.info("0.0");
//console.info(branchInfo);
//console.info(req.body.ref.indexOf(branchInfo.name));
		if(req.body.ref && req.body.ref.indexOf(branchInfo.name)>-1){
//console.info("1");
			var forwardRequest = http.request(branchInfo.options, function(){});
//console.info("2");
			setTimeout(function(){
				forwardRequest.end();
				res.end("Y");
			},500);
//console.info("3");
		}else{
			res.end("N");
		}
	}else{
		res.end("N");
	}
});
	 
module.exports = router;

