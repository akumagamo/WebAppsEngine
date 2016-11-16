module.exports = 
	function(path){
		var express = require('express');
		var router = express.Router();

		var pathList  = path.split(/\\|\//gi);
		var matchPath = "/" + pathList.slice(pathList.length-2).join("/");
		var viewBasePath = ".." + matchPath + "/views";

		return {
			router:router,
			matchPath:matchPath,
			viewBasePath:viewBasePath
		};
};
