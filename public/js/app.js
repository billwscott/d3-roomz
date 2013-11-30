'use strict';

require(['lib/jquery/jquery', 'lib/d3/d3', 'config', 'floorPlan'], 
function ($, d3, config, floorPlan) {

    var app = {
        initialize: function () {

        	floorPlan.initialize(17,5);

		}

    };

    app.initialize();

});
