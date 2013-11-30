'use strict';

require(['config'], function (config) {

	require(['jquery', 'd3', 'floorPlan'], function ($, d3, floorPlan) {

	    var app = {
	        initialize: function () {

	        	floorPlan.initialize(17,5);
			}

	    };

	    app.initialize();

	});
});
