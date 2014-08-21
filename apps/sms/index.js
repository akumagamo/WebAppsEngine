var express = require('express');
var router = express.Router();
var messages = require('./routes/messages');

var path  = __dirname.split("\\");
var matchPath = "/" + path.slice(path.length-2).join("/");

router.get('/messages', messages.list);
router.get('/messages/:id', messages.single);
router.post('/messages', messages.send);
router.delete('/messages/:id', messages.delete);

module.exports = router;

