'use strict';

var echojs = require("./echojs");

exports.setup = function setup(app, callback) {
	app.get("/api/latest/:index?", function ctrlAPILatest(req, res, next) {
		var index = parseInt(req.params.index, 10) || 0;

		echojs.getLatestNews(index, function onDone(err, response) {
			if (err) {
				return next(err);
			}

			res.ok().json(response);
		});
	});

	app.get("/api/top", function ctrlAPILatest(req, res, next) {
		echojs.getTopNews(function onDone(err, response) {
			if (err) {
				return next(err);
			}

			res.ok().json(response);
		});
	});

	callback(null);
	return app;
};
