'use strict';

// Module dependencies
var config = require("./config");

// Save a reference to Object#hasOwnProperty
var has = Object.prototype.hasOwnProperty;

/**
 * Configures the application
 * @param  {app} app
 * @return {app}     app
 */
exports.configure = function configure(app, callback) {
	var key;

	for (key in config) {
		if (!has.call(config, key)) {
			continue;
		}

		app.set(key, config[key]);
	}

	callback(null);

	return app;
};

/**
 * Returns the configuration for `key`.
 * @param  {String} key
 * @return {Mixed}     configuration for `key`.
 */
exports.get = function get(key) {
	return config[key];
};

/**
 * Sets the configuration for `key`
 * @param {String} key
 * @param {Mixed} value
 * @return {Object} exports
 */
exports.set = function set(key, value) {
	config[key] = value;
	return exports;
};
