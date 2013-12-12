'use strict';

var mongoose = require('mongoose');

// placeholder for the booking function
module.exports = function (server) {

    server.get('/save', function (req, res) {

        //res.render('save', {}); 

		var rooms = [

			// top
			{x:63, y:12, width:18, height:14, name:'Leeds', color: '#FC7F08', bldg:'17', floor:'1', location:'010'},
			{x:69, y:28, width:12, height:17, name:'Rest Room', color: '#D4D4D4', bldg:'17', floor:'1', location:'000'},
			{x:83, y:28, width:12, height:17, name:'Elevator', color: '#D4D4D4', bldg:'17', floor:'1', location:'000'},

		];

		var Schema = mongoose.Schema;

		var bldgSchema = Schema({
			_id: Number,
			name: String,
			floors: [{type: Schema.Types.ObjectId, ref: 'Floor'}]
		});

	    var floorSchema = Schema({
	    	_id: Number,
	    	_creator: {type: Number, ref: 'Building'},
	    	level: Number,
	    	rooms: [{type: Schema.Types.ObjectId, ref: 'Room'}]
	    });

	    var roomSchema = Schema({
	    	_creator: {type: Number, ref: "Floor"},
	        x: Number,
	        y: Number,
	        width: Number,
	        height: Number,
	        name: String,
	        color: String,
	        bldg: String,
	        floor: String,
	        location: String
	    });

	    var Building = mongoose.model('Building', bldgSchema);
	    var Floor = mongoose.model('Floor', floorSchema);
	    var Room  = mongoose.model('Room', roomSchema);


		var bldg17 = new Building({_id: 17, name: "17"});

		bldg17.save(function(err) {
			if(err) console.log(err);

			for(var i=0; i<5; i++) {
				var floor = new Floor({
					_id: (i+1),
					_creator: bldg17._id
				});
				floor.save(function(err) {
					if (err) console.log(err);

					for(var j=0; j<rooms.length; j++) {
						var room = new Room(rooms[j]);
						room._creator = floor._id;
						room.save(function (err) {
							if(err) console.log(err);
						});
					}
				});
			}
		});


        res.redirect('/edit');

    });

};
