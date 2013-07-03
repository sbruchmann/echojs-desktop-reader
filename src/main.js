'use strict';

// Module dependencies
var config = require("./config");
var controllers = require("./controllers/");
var express = require("express");
var FNStack = require("fn-stack");
var http = require("http");
var middleware = require("./middleware");

var app = express();
var port = config.get("port");
var server = null;
var setup = new FNStack();

function onServerStarted() {
	if (config.get("env") === "development") {
		console.log("EchoJS Desktop server is listening on port %d", port);
	}
}

function onSetupCompleted(err) {
	if (err) {
		throw err;
	}

	server = http.createServer(app);
	server.listen(port, onServerStarted);
}

setup.push(config.configure)
	 .push(middleware.setup)
	 .push(controllers.setup)
	 .run([app], onSetupCompleted);
