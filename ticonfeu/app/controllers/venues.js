var args = arguments[0] || {};
var venuesService = args.venuesService;

venuesService.getAll(function(error, data) {
	if (!error) {
		if (_.isEmpty(data)) {
			$.notFound.show();
		} else {
			var items = _.map(data, function(venue){
				return {
					name : {
						text : venue.name
					}
				}
			});
			$.venuesSection.setItems(items);
		}
	}
});

$.venues.open();