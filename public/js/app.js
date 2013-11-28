'use strict';

require(['jquery', 'lib/d3', 'config', 'floorPlan'], 
function ($, d3, config, floorPlan) {

    var app = {
        initialize: function () {

        	floorPlan.initialize(17,5);

		}

    };

    app.initialize();

});
