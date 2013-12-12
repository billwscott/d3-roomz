'use strict';

require(['config'], function (config) {

	require(['jquery', 'd3','floorPlanEditor', 'floorPlan', 'bootstrap-tab'], function ($, d3, floorPlanEditor, floorPlan) {

		var editApp = {
			initialize: function () {
				floorPlanEditor.initialize(17, 5, floorPlan);

				$('#editor-tab a').click(function (e) {
					  e.preventDefault()
					  $(this).tab('show')
				})
			}
	    };

	    editApp.initialize();

	});
});
