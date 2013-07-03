'use strict';

var echojs = require("./echojs");

exports.setup = function setup(app, callback) {
	app.get("/api/:type/:start?", function ctrlAPILatest(req, res, next) {
		var options = {};
		var params = req.params;

		options.count = 30;
		options.type = params.type;
		options.start = params.start || 0;

		echojs.getNews(options, function(err, response) {
			if (err) {
				throw err;
			}

			res.ok().json(response);
		});
	});

	callback(null);
	return app;
};
