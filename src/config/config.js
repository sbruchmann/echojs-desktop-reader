'use strict';

var path = require("path");

var config = exports;

config.env = process.env.ECHOJS_ENV || "development";
config["jsonp callback name"] = "JSON_CALLBACK";
config["json spaces"] = 4;
config.port = process.env.ECHOJS_PORT || 3001;
config.PATHS = {
	CLIENT: path.resolve(__dirname, path.join("..", "client"))
};
