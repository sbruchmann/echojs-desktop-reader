angular.module("moment", [])
	.filter("fromNow", function() {
		return function(timestamp, omitSuffix) {
			console.log(timestamp);
			return moment(timestamp).fromNow(omitSuffix);
		}
	});
