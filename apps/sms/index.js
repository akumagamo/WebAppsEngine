var express = require('express');
var router = express.Router();
var messages = require('./routes/messages');

var path  = __dirname.split("/");
var matchPath = "/" + path.slice(path.length-2).join("/");
var viewBasePath = ".." + matchPath + "/views";

router.get(matchPath, function(req, res) {
	res.render(viewBasePath + "/msg", {});
});

)
router.get(matchPath + "/messages", messages.list);
router.get(matchPath +"/messages/:id", messages.single);
router.post(matchPath +"/messages", messages.send);
router.delete(matchPath +"/messages/:id", messages.delete);

module.exports = router;

