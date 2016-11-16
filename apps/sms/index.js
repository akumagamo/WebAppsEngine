var appsHelper = require('../apps-helper')(__dirname);
var router = appsHelper.router;
var matchPath = appsHelper.matchPath;
var viewBasePath = appsHelper.viewBasePath;

var messages = require('./routes/messages');

router.get(matchPath, function(req, res) {
	res.render(viewBasePath + "/msg", {});
});

router.get(matchPath + "/messages", messages.list);
router.get(matchPath +"/messages/:id", messages.single);
router.post(matchPath +"/messages", messages.send);
router.delete(matchPath +"/messages/:id", messages.delete);

module.exports = router;


