describe("An awesome test framework", function() {
	it("should work without pain", function() {
		expect(true).toBe(true);
	});

	it("should let you run a simple unit test", function() {
		expect(1 + 1).toBe(2);
	});

	it("should let you test a commonjs module", function() {
		// Arrange
		var calc = require("calculator");
		// Act
		var result = calc.sum(1, 2);
		//Assert
		expect(result).toBe(3);
	});

	it("should let you run async tests", function() {
		// Simply adding a delay
		var flag = false;
		setTimeout(function() {
			flag = true;
		}, 200);
		//guard
		expect(flag).toBe(false);
		waits(100);
		runs(function() {
			expect(flag).toBe(false);
		});
		waits(100);
		runs(function() {
			expect(flag).toBe(true);
		});
	});

	it("should let you run an sync test waiting for a condition", function() {
		// Sometimes you just don't know how much time an async process will take
		function getRandomArbitrary(min, max) {
			return Math.random() * (max - min) + min;
		};

		var flag = false;
		setTimeout(function() {
			flag = true;
		}, getRandomArbitrary(100,300));

		expect(flag).toBe(false);
		
		waitsFor(function(){
			return flag;
		},300);
		
		runs(function() {
			expect(flag).toBe(true);
		});

	});

	xit("should let you skip tests", function(){
		//Maybe, one day... quantum computing :)
		expect(cat).toBe("ALIVE");
		expect(cat).toBe("DEAD");
	});

	it("should let you spy on object",function(){
		// Cheatsheet: http://tobyho.com/2011/12/15/jasmine-spy-cheatsheet/
		// Don't spy on framework functions (they are shy)
		var counter = {
			incr : function(){}
		};
		var createLoggedButton = function(counter){
			return {
				click : function(){
					counter.incr();
					console.log("CLICKED");
				}
			};
		};
		var incr = spyOn(counter, "incr");

		var button = createLoggedButton(counter);

		button.click();
		button.click();
		button.click();
		expect(incr).toHaveBeenCalled();
		expect(incr.callCount).toBe(3);

	});

	it("should let you add custom matchers", function(){
		// In addition to standard ones: https://github.com/pivotal/jasmine/wiki/Matchers
		expect(true).toBe(false);

	});
});