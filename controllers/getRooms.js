'use strict';

var FloorPlanModel = require("../models/floorPlanModel");

module.exports = function (server) {

    server.get('/getRooms/:bldg/floor/:floor', function (req, res) {

		//res.contentType('json');
		res.type('application/json');

		var bldg = req.params.bldg,
		    floor = req.params.floor,
		    floorPlanModel = new FloorPlanModel(); // for now don't cache

		// floorPlanModel.load(bldg, floor, function() {
			// console.log('floorPlanModel is now loaded');
		// });

    	// need to change to support async
    	//res.json(floorPlanModel.load(bldg, floor));

    	floorPlanModel.loadAsync(bldg, floor, function(floorData) {
    		res.json(floorData);
    	});



 /*
 	could also do a variant where we just render a dust template with this data
 	instead of using d3 for the render engine.

 	res.format({
			html: function() {
				res.render(req.model.viewName, req.model);
			},
			json: function() {
				res.json(req.model);
			}
		});
*/
        
    });
};