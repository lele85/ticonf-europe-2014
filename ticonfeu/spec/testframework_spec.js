describe("An awesome test framework", function(){
	it("should work without pain", function(){
		expect(true).toBe(true); 
	});

	it("should let you run a simple unit test", function(){
		expect(1+1).toBe(2);
	});

	it("should let you unit test common js modules", function(){
		var c = require("calculator"); //You always need one
		expect(c.sum(1,3)).toBe(4);
	});
	
});