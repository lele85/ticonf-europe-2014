ticonf-europe-2014
==================

Installation:
-------------
Install tishadow
	npm install -g tishadow

Create tishadow app:
	
	mkdir tishadow_app
	tishadow app -d tishadow_app

Run specs:
----------

Start tishadow server:
	tishadow server

Run tishadow app from the appropriate folder:
	cd tishadow_app && titanium build -p ios

Connect to the running server.
Go to your project folder and push the specs:

	cd ticonf
	tishadow spec

If you want to view only test cases information you can grep the output:

	tishadow spec | grep TEST

Enjoy :)