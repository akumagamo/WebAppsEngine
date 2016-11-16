var serialLib = require("serialport");
var serialOptions = {baudrate:57600, parser:serialLib.parsers.readline("\n")};
var serialConsole = new serialLib.SerialPort("/dev/ttyACM0", serialOptions);

var END_OF_LINE = "\r";
var CTRL_Z = String.fromCharCode(26);

var OK_RESPONSE = "OK" + END_OF_LINE;
var ERROR_RESPONSE = "ERROR" + END_OF_LINE;

var READALL_MSG_RESPONSE_SEPERATOR = "+CMGL: ";
var READ_MSG_RESPONSE_SEPERATOR = "+CMGR: ";

var AT_REQUEST = "AT"+ END_OF_LINE;
var SET_TEXTMODE_REQUEST = "AT+CMGF=1"+ END_OF_LINE;
var SET_UTF8MODE_REQUEST = "AT+CSCS=\"UTF8\""+ END_OF_LINE;
var DELETE_MSG_REQUEST = "AT+CMGD={0}"+ END_OF_LINE;
var SEND_MSG_REQUEST = "AT+CMGS=\"{0}\"" + END_OF_LINE + "{1}"+ CTRL_Z;
var READ_MSG_REQUEST = "AT+CMGR={0}"+ END_OF_LINE;
var READALL_MSG_REQUEST = "AT+CMGL=\"ALL\""+ END_OF_LINE;

var MSG_REGEXP_PARSER =/(?:(?:(\d+))|(?:\s"([^"]+)")),"([^"]+)"(?:,"([^"]+)")?\r([\s\S]+)/g;
var MSG_DEFAULT_ID = -1;
var MSG_DEFAULT_DATE = "";

function mixinParams(text){
    var args = [].slice.call(arguments,1);
    return text.replace(/(\{([^}]+)\})/g, function(){return args[arguments[2]]||"";})
}

var commands = {
    sendCommand:function(commandArgs){
		if(this.isRunning)
			throw new Error("Already Running!");
        this.isRunning = true;
        
		this.currentCommand.callback = (function(sender, callback){
			return function(data){sender.finalizeCommand(data, callback);}
		})(this, commandArgs.callback);
		var args = [].slice.call(commandArgs.args, 0,-1);
		args.unshift(commandArgs.command);
		serialConsole.write(mixinParams.apply(null, args)); 
    },
    setTextMode:function(callback){
        this.sendCommand({callback:callback, command:SET_TEXTMODE_REQUEST, args:arguments});
    },
    at:function(){
        this.sendCommand({callback:function(data){console.info(data)}, command:AT_REQUEST, args:arguments});
    },
    setUTF8Mode:function(callback){
        this.sendCommand({callback:callback, command:SET_UTF8MODE_REQUEST, args:arguments});
    },
    deleteMessageWithId: function(id, callback){
        this.sendCommand({callback:callback, command:DELETE_MSG_REQUEST, args:arguments});
    },
    sendMessageToNumber: function(number, msg, callback){ 
        this.sendCommand({callback:callback, command:SEND_MSG_REQUEST, args:arguments});
    },
    readMessageWithId: function(id, callback){
        this.sendCommand({callback:callback, command:READ_MSG_REQUEST, args:arguments});
    },
    readAllMessages: function(callback){
        this.sendCommand({callback:callback, command:READALL_MSG_REQUEST, args:arguments});        
    },
    _createMessage:function(item){
        MSG_REGEXP_PARSER.lastIndex = 0;
        var regExpData = MSG_REGEXP_PARSER.exec(item);
        var isListMsg = (undefined != regExpData[1]);
        return {
            id:(regExpData[1] || MSG_DEFAULT_ID),
            storage:(isListMsg?regExpData[3]:regExpData[2]), 
            phoneNumber:(isListMsg?regExpData[4]:regExpData[3]),    
            dateTime:(regExpData[4] || MSG_DEFAULT_DATE),
            message:regExpData[5],
            data:regExpData[0]
        };
    },
    on:function(eventtype, callback){
        if(eventtype.toLowerCase()=="ready")
            this._onReady = callback;
    },
    init:function(){
        this.isRunning = false;
        this.currentCommand = {readData:""};
        return this;
    },
    parseResponse:function(data){
	if(data==OK_RESPONSE || data==ERROR_RESPONSE)
		return this.currentCommand.callback(this.currentCommand.readData);
	this.currentCommand.readData += data;
    },
    ready:function(){
		if(this._onReady !=undefined)
			this._onReady();
	},
    close:function(){serialConsole.close();},
	formatResponseData:function(data){
		if(data != null && data.indexOf(READALL_MSG_RESPONSE_SEPERATOR)> -1){
			var items = data.split(READALL_MSG_RESPONSE_SEPERATOR).splice(1);
			data = [];
			for(var item in items){
				data.push(this._createMessage(items[item]));
			}
		}else if(data.indexOf(READ_MSG_RESPONSE_SEPERATOR)>-1){
			data = this._createMessage(data);
		}
		return data;
	},
	finalizeCommand:function(data, callback){
		this.init();
		if(callback!=undefined)
			callback(this.formatResponseData(data));
	}
};

exports.Commands = (function(){
    serialConsole.on("open",function(){
        serialConsole.on("data",function(data){commands.parseResponse(data);});
		commands.setTextMode(function(){commands.setUTF8Mode(function(){commands.ready();});});
    });
    return commands.init();
})();