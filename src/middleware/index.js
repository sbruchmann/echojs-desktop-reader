'use strict';

var express = require("express");
var lactate = require("./lactate");
var quip = require("quip");
var stylus = require("./stylus");

exports.setup = function setup(app, callback) {
	var env = app.get("env");
	var isDevEnv = env === "development";

	app.use(express.compress());

	if (isDevEnv) {
		app.use(express.favicon());
		app.use(express.logger("dev"));
	}

	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(quip());
	app.use(app.router);
	app.use(stylus.setup(app));
	app.use(lactate.setup(app));

	if (isDevEnv) {
		app.use(express.errorHandler());
	}

	callback(null);
};
