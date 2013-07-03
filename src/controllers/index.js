'use strict';

var api = require("./api/");
var FNStack = require("fn-stack");
var index = require("./index/");

var ctrlSetup = new FNStack();

ctrlSetup.push(index.setup)
		 .push(api.setup);

exports.setup = function setup(app, callback) {
	ctrlSetup.run([app], callback);
};
