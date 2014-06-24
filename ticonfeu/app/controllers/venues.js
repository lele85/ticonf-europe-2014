var args = arguments[0] || {};
var venuesService = args.venuesService;

venuesService.getAll(function(error, data) {
	if (!error) {
		if (_.isEmpty(data)) {
			$.notFound.show();
		}
	}
});

$.venues.open();