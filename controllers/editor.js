'use strict';

module.exports = function (server) {

    server.get('/edit', function (req, res) {

        res.render('edit', {});  

    });

};
