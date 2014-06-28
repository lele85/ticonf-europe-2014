var args = arguments[0] || {};
var venuesService = args.venuesService;


venuesService.getAll(function(error, data) {
	if (!error) {
		Ti.App.Properties.setObject("venues", data);
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
	} else {
		$.networkError.show();
	}
});

$.venues.open();