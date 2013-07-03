'use strict';

exports.setup = function setup(app, callback) {
	app.get("/", function controllerTop(req, res, next) {
		req.url = "/index.html";
		return next(null);
	});

	callback(null);
}
