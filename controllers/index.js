'use strict';


module.exports = function (server) {

    server.get('/', function (req, res) {

		// get the locale if available from the request variable 'locale'
		var customerLocality = req.query.locale ? req.query.locale : 'US_en';
		res.locals.context = {locality: customerLocality};

        var model = { name: 'roomz' };
        res.render('index', model);
        
    });

};
