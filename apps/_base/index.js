var appsHelper = require('../apps-helper')(__dirname);
var router = appsHelper.router;
var matchPath = appsHelper.matchPath;
var viewBasePath = appsHelper.viewBasePath;

router.get(matchPath, function(req, res) {
	res.render(viewBasePath + "/index", {
		title: "This is a Template for creating Apps",
		body: "Here you can see the basic layout and structure of the AppsEngine Project."		
	});
});
	 
module.exports = router;

