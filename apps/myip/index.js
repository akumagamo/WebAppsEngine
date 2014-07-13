var express = require('express');
var router = express.Router();

var path  = __dirname.split("/");
var matchPath = "/" + path.slice(path.length-2).join("/");


var pg = require('pg');
var connectionString = "postgres://servicePostgres:postGres@localhost/nodetest";

router.get(matchPath, function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	pg.connect(connectionString, function(error, client, done){
		client.query("select ip from ip_addresses order by updatetime desc;",[],function(err,result){
done();			
res.end(result.rows[0].ip);
		});
	});


});

router.put(matchPath, function(req, res, next) {
	var ipToSave = req.query.ip || req.connection.remoteAddress;
pg.connect(connectionString,function(err, client, done){
		client.query('insert into ip_addresses (ip) values($1);',[ipToSave], function(err, result){
done();
res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end();
		});
	});
});
	 
module.exports = router;

