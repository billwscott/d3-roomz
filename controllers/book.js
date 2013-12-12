'use strict';

// placeholder for the booking function
module.exports = function (server) {

    server.get('/book', function (req, res) {

        res.render('book', {});  

    });

};
