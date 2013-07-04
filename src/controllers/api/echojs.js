'use strict';

var _ = require("lodash");
var moment = require("moment");
var request = require("request");
var url = require("url");

var ENDPOINT = "http://echojs.com/api/";

function normalizeNewsItem(item) {
	var type = /text\:\/\//.test(item.url) ? "text" : "link";

	return {
		author: item.username,
		comments: parseInt(item.comments, 10),
		id: item.id,
		date: moment.unix(parseInt(item.ctime, 10)).toDate(),
		origin: type === "link" ? url.parse(item.url).hostname : "EchoJS",
		title: item.title,
		type: type,
		url: type === "link" ? item.url : "http://echojs.com/news/" + item.id,
		votes: {
			down: parseInt(item.down, 10),
			up: parseInt(item.up, 10)
		}
	};
}

exports.getNews = function getNews(options, callback) {
	var url = ENDPOINT + "getnews";

	url += "/" + options.type;
	url += "/" + (options.start || 0);
	url += "/" + (options.count || 30);

	return request.get(url, function(err, res, body) {
		var news;

		if (err) {
			return callback(err);
		}

		try {
			body = JSON.parse(body);
		} catch (err) {
			return callback(err);
		}

		if (body.status !== "ok") {
			return callback(new Error(body.status));
		}

		news = _.map(body.news, normalizeNewsItem);
		callback(null, news);
	});
};
