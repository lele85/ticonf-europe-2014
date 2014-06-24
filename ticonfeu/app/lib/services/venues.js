var XHR = require("xhr");

exports.getAll = function(cb){
	var xhr = new XHR();
	xhr.get("http://localhost:8000/venues",
		function(data){
			cb(null,data);
		},
		function(){
			cb(true);
		}
	);
};