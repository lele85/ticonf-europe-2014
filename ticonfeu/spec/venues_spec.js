describe("Venues", function() {
	var Alloy = require("alloy");
	var $;
	var venuesService;
	var getAll;

	beforeEach(function() {
		venuesService = require("services/venues");
		getAll = spyOn(venuesService, "getAll");
		expect(getAll).not.toHaveBeenCalled();

		$ = Alloy.createController("venues", {
			venuesService: venuesService
		});
	});

	//Unit Test
	it("should contains venues title", function() {
		expect($.title.text).toBe("Venues");
	});

	//Interaction test
	it("should fetch the list of venues from web service", function() {
		waitsFor(function() {
			return getAll.wasCalled;
		}, 500);
		runs(function() {
			expect(getAll).toHaveBeenCalled();
		})
	});

	it("should show an appropriate message if no venues was found", function() {
		expect($.notFound.visible).toBe(false);

		getAll.andCallFake(function(cb) {
			cb(null, []);
		});

		$ = Alloy.createController("venues", {
			venuesService: venuesService
		});
		waitsFor(function() {
			return getAll.wasCalled;
		}, 500);
		runs(function() {
			expect($.notFound.visible).toBe(true);
		});
	});

	it("should show an appropriate message if service call fails", function() {
		expect($.networkError.visible).toBe(false);

		getAll.andCallFake(function(cb) {
			cb(true);
		});

		$ = Alloy.createController("venues", {
			venuesService: venuesService
		});



		waitsFor(function() {
			return getAll.wasCalled;
		}, 500);

		runs(function() {
			expect($.networkError.visible).toBe(true);
		});
	});

	it("should show venues on a listView if present", function() {

		getAll.andCallFake(function(cb) {
			cb(null, [{
				name: "Amsterdam"
			}, {
				name: "Bangalore"
			}, {
				name: "Sydney"
			}, {
				name: "Santiago"
			}, {
				name: "Singapore"
			}, {
				name: "New York"
			}]);
		});


		$ = Alloy.createController("venues", {
			venuesService: venuesService
		});

		waitsFor(function() {
			return getAll.wasCalled;
		}, 500);
		runs(function() {
			expect($.notFound.visible).toBe(false);
			expect($.venuesSection.items.length).toBe(6);
		});
	});

	it("should cache venues inside app properties when they fetched for the fist time", function() {
		// You can find a good part of titanium apis here: https://gist.github.com/Cside/2233668
		var realApp = Ti.App.Properties;
		Titanium.App = function(){};
		Titanium.App.Properties =  function(){};
		Titanium.App.Properties.setObject = function(){};

		var setObject = spyOn(Ti.App.Properties, "setObject");

		getAll.andCallFake(function(cb) {
			cb(null, [{
				name: "Amsterdam"
			}]);
		});

		$ = Alloy.createController("venues", {
			venuesService: venuesService
		});

		waitsFor(function() {
			return getAll.wasCalled;
		});

		runs(function() {
			expect(setObject).toHaveBeenCalled();
		});

	});
});