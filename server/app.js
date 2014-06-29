var express = require("express");
var app = express();

var mockVenues = [{
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
}];

app.get('/venues', function(req, res) {
	res.contentType('application/json');
	res.send(mockVenues);
});

app.use(express.static(__dirname + '/static'));
console.log("Serving: http://localhost:8000");
app.listen(8000);