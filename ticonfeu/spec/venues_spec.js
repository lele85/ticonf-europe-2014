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

	it("should cache venues inside app properties", function() {

	});
});