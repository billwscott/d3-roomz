'use strict';

requirejs.config({
	paths: {
		"jquery": "lib/jquery/jquery",
		"d3": "lib/d3/d3",
		"backbone": "lib/backbone/backbone",
		"underscore": "lib/underscore/underscore",
		"nougat": "core/nougat",
		"BaseView": "core/baseView",
		"dust": "lib/dust/dust-core-2.0.3",
		"dust-helpers" : "lib/dust/dust-helpers-1.1.1",
		"dust-helpers-supplement" : "lib/dust/dust-helpers-supplement"
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
