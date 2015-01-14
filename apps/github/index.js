var appsHelper = require('../apps-helper')(__dirname);
var router = appsHelper.router;
var matchPath = appsHelper.matchPath;

var http = require("http");
var config = require('./config.js');

router.post(matchPath + "/:repo", function(req, res, next) {
	var repoName = req.params["repo"];
	console.info(repoName);
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

