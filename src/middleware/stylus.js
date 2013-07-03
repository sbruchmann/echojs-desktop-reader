'use strict';

var nib = require("nib");
var stylus = require("stylus");

exports.setup = function setup(app) {
	return stylus.middleware({
		compile: function compileStylus(source, filename) {
			return stylus(source)
					.set("compress", true)
					.set("filename", filename)
					.use(nib())
					.import("nib")
		},
		src: app.get("PATHS").CLIENT
	});
};
