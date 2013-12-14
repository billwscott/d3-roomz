'use strict';


var kraken = require('kraken-js'),
	express = require('express'),
	appsec = require('lusca'),
	server = express(),
	db = require('./lib/database'),
    app = {};


app.configure = function configure(nconf, next) {
    // Fired when an app configures itself

	// server.use(appsec({
		// csrf: true,
		// csp: { /* ... */},
		// xframe: 'SAMEORIGIN',
		// p3p: 'ABCDEF'
	// }));
	nconf.set('middleware:appsec:csrf', false);

    db.config(nconf.get('databaseConfig'));

	next(null);
};


app.requestStart = function requestStart(server) {
    // Fired at the beginning of an incoming request
};


app.requestBeforeRoute = function requestBeforeRoute(server) {
    // Fired before routing occurs
};


app.requestAfterRoute = function requestAfterRoute(server) {
    // Fired after routing occurs
};


kraken.create(app).listen(function (err) {
    if (err) {
        console.error(err);
    }
});
