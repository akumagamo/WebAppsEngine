var global = require('../global-config.js');

var express = require('express');
var router = express.Router();

var pjson = require('../package.json');

/* GET home page. */
router.get("/", function(req, res) {
  res.render("info", { title: "Info Page",
 version: pjson.version, applist:global.appsNameList});
});

module.exports = router;
