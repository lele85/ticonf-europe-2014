$.venues.addEventListener('click', function(){
	Alloy.createController('venues', {
		venuesService : require("/services/venues")
	});
});

$.index.open();
