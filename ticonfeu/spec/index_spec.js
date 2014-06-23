describe("Index", function() {
	var Alloy = require("alloy");
	var $;


	beforeEach(function() {
		$ = Alloy.createController("index");
	});


	it("should contain application title", function() {
		expect($.title.text).toEqual("tiConf 2014");
	});

	it("should contain a button to reach conference venues", function() {
		expect($.venues.title).toEqual("venues");
		spyOn(Alloy, "createController");
		$.__views.venues.fireEvent('click');
		waitsFor(function() {
			return Alloy.createController.callCount === 1;
		}, 500);
		runs(function() {
			expect(Alloy.createController).toHaveBeenCalledWith('venues');
		});
	});

});