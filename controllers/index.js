'use strict';

var FloorPlanModel = require("../models/floorPlanModel");

module.exports = function (server) {

    server.get('/', function (req, res) {

		var floorPlanModel = new FloorPlanModel(); // for now don't cache

		// get the locale if available from the request variable 'locale'
		var customerLocality = req.query.locale ? req.query.locale : 'US_en';
		res.locals.context = {locality: customerLocality};

    	floorPlanModel.loadAsync(17, 5, function(floorData) {
    		res.render('index', {rooms:floorData});
    	});
		

        //res.render('index', model);
        
    });

};
