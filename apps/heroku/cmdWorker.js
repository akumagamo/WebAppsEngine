var execCmd = require('child_process').exec;
var options = {"cwd":"/home/pi/heroku/deployment/"};
var GIT_DEPLOY_COMMAND = "git push heroku current:master";
var GIT_LOAD_COMMAND = "git pull";
var GIT_UPTODATE_MESSAGE = "Already up-to-date.\n";
var NO_UPDATE_NEEDED = "No update needed!";
var UPDATE_DEPLOYED = "Update Deployed!";

module.exports = {"test":"123","do" : function (callback){ 
     execCmd(GIT_LOAD_COMMAND, options, function(e, out, err){
        var bodyMessage = "BLANK";

        if(out != GIT_UPTODATE_MESSAGE){ 
            execCmd(GIT_DEPLOY_COMMAND, options, function(e, out, err){
               callback(UPDATE_DEPLOYED);
            });
        }else{
            callback(NO_UPDATE_NEEDED);
        }
    });

}};
