var echojs = angular.module("echojs", ["moment"]);

echojs.factory("api", [
	"$http", "$q",
	function($http, $q) {
		'use strict';

		return {
			getLatest: function getLatest(count) {
				var deferred = $q.defer();
				var url = "/api/latest/" + (count || 0);

				$http.get(url).then(function(response) {
					deferred.resolve(response.data);
				});

				return deferred.promise;
			},
			getTop: function getTop() {
				var deferred = $q.defer();
				var url = "/api/top/";

				console.log(arguments);
				$http.get(url).then(function(response) {
					deferred.resolve(response.data);
				});

				return deferred.promise;
			}
		}
	}
]);

echojs.controller("ListCtrl", [
	"$rootScope", "$scope", "$timeout", "api",
	function($rootScope, $scope, $timeout, api) {
		$scope.list = {
			current: null,
			items: [],

			select: function(item) {
				$scope.list.current = item;
			}
		};

		api.getLatest().then(function(items) {
			angular.forEach(items, function(item, index) {
				$timeout(function() {
					$scope.list.items.push(item);
				}, 1 * index);
			});
		});
	}
]);
