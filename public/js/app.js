'use strict';

require(['config'], function (config) {

	require(['jquery', 'd3', 'backbone', 'nougat','floorPlan'], function ($, d3, Backbone, nougat, floorPlan) {

		var app = {
			initialize: function () {
				floorPlan.initialize(17,5);
			}
	    };

	    app.initialize();

	});
});
