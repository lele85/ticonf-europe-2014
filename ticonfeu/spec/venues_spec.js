describe("Venues", function() {
	var Alloy = require("alloy");
	var $;
	var venuesService;
	var getAll;

	beforeEach(function() {
		venuesService = require("services/venues");
		getAll = spyOn(venuesService,"getAll");
		expect(getAll).not.toHaveBeenCalled();
		$ = Alloy.createController("venues",{
			venuesService : venuesService
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
		},500);
		runs(function(){
			expect(getAll).toHaveBeenCalled();
		})
	});

	it("should show an appropriate message if no venues was found", function(){
		expect($.notFound.visible).toBe(false);
		
		getAll.andCallFake(function(cb){
			cb(null, []);
		});
		
		$ = Alloy.createController("venues",{
			venuesService : venuesService
		});
		waitsFor(function() {
			return getAll.wasCalled;
		},500);
		runs(function(){
			expect($.notFound.visible).toBe(true);
		});
	});
});