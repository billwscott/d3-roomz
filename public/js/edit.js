'use strict';

require(['config'], function (config) {

	require(['jquery', 'd3','floorPlanEditor'], function ($, d3, floorPlanEditor) {

		var editApp = {
			initialize: function () {
				floorPlanEditor.initialize();
			}
	    };

	    editApp.initialize();

	});
});
