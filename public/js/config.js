'use strict';

requirejs.config({
	paths: {
		"jquery": "lib/jquery/jquery",
		"d3": "lib/d3/d3",
		"bootstrap-tab": "lib/bootstrap/js/tab",
		"backbone": "lib/backbone/backbone",
		"underscore": "lib/underscore/underscore",
		"BaseView": "core/baseView"
	},
	shim: {
    	"dust": {
			exports: "dust"
		},
		"dust-helpers": {
			deps: ["dust"]
		},
		"dust-helpers-supplement": {
			deps: ["dust", "dust-helpers"]
		},
		"underscore": {
			exports: "_"
		},
		"backbone": {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		}

    }
});
