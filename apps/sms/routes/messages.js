//var smsCommands = require("../bin/sms-connector").Commands;

exports.list = function(req, res){
        res.setHeader("Access-Control-Allow-Origin","*");
 /*       smsCommands.readAllMessages(function(messages){
            res.json(messages);   
        });*/
};

exports.single = function(req, res){
 /* if(req.params.id){
        smsCommands.readMessageWithId(req.params.id, function(message){
            res.json(message);   
        });
  }else{
    res.statusCode = 500;
    next(new Error('error message'));
  }*/
};

exports.send = function(req, res){
/*if(req.body.number && req.body.message){
        smsCommands.sendMessageToNumber(req.body.number, req.body.message, function(status){
            res.json(status);   
        });
  }else{
    res.statusCode = 500;
    next(new Error('error message'));
  }*/
};

exports.delete = function(req, res){
/*if(req.params.id){
        smsCommands.deleteMessageWithId(req.params.id,function(status){
            res.json(status);   
        });
  }else{
    res.statusCode = 500;
    next(new Error('error message'));
  }*/
};
