var appsHelper = require('../apps-helper')(__dirname);
var router = appsHelper.router;
var matchPath = appsHelper.matchPath;
var viewBasePath = appsHelper.viewBasePath;

var cmdWorker = require("./cmdWorker.js");



router.put(matchPath, function(req, res) {
	cmdWorker.do(function(body){
		res.render(viewBasePath + "/index", {
			title: "Mini Continuous Deployment Tool!",
			body: body		
		});
	});
});
	 
module.exports = router;

