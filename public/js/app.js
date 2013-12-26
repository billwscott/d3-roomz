'use strict';

require(['config'], function (config) {

	require(['jquery', 'd3', 'backbone','floorPlan'], function ($, d3, Backbone, floorPlan) {

		var app = {
			initialize: function () {
				floorPlan.initialize(17,5, null, {editable:false});
			}
	    };

	    app.initialize();

	});
});
