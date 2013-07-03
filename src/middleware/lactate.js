'use strict';

var lactate = require("lactate");

exports.setup = function setup(app) {
	return lactate.static(app.get("PATHS").CLIENT);
};
