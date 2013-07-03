'use strict';

var $ = require("cheerio");
var _ = require("lodash");
var moment = require("moment");
var request = require("request");

var host = "http://echojs.com/";
var reTimestamp = /(\d)+\s(second|minute|hour|day|week|month|year)s?\s?/;

function parse(url, callback) {
	return request(url, function onRequestCompleted(err, _res, body) {
		var $news, response = [];

		if (err) {
			return callback(err);
		}

		$news = $("[data-news-id]", body);
		$news.each(function iterator(index) {
			var $item = $(this);
			var $link = $item.find("h2 a");
			var $meta = $item.find("p");
			var origin = $item.find("address").text();
			var url = $link.attr("href");
			var date, timestamp;

			if (url.charAt(0) === "/") {
				url = host + url.substr(1);
			}

			timestamp = $meta.html().match(reTimestamp).slice(1);
			date = moment().subtract(timestamp[1], parseInt(timestamp[0], 10));

			response.push({
				author: $meta.find("a[href*=user]").text(),
				date: date.toDate(),
				comments: parseInt($meta.find("a[href*=news]").text(), 10) || 0,
				id: $item[0].attribs["data-news-id"],
				origin: origin === "" ? "EchoJS" : origin.substr(3),
				title: $link.text(),
				url: url,
				votes: {
					down: parseInt($meta.find(".downvotes").text(), 10),
					up: parseInt($meta.find(".upvotes").text(), 10)
				}
			});
		});

		callback(null, response);
	});
};

exports.getLatestNews = function getLatestNews(index, callback) {
	var url = host + "latest/";

	if (!callback && typeof index === "function") {
		callback = index;
		index = 0;
	}

	url += index;

	return parse(url, callback);
};

exports.getTopNews = function getTopNews(callback) {
	return parse(host, callback);
};
