define([],

function () {

	'use strict';

	var FloorPlanEditor = {

		floorPlan: null,
		xCoordFactor: 6,
		yCoordFactor: 6,
		roomMinWidth: 8,
		roomMinHeight: 8,

		initialize: function (bldg, floor, floorPlan) { 

			this.floorPlan = floorPlan;
			this.loadSVGFile('USA-SANJOSE-NORTH-17-05.dwg.svg', '.floor-svg-container', 250);

		},

		loadSVGFile: function(svgFileName, appendElem, yOffset) {
			var self = this;
			d3.xml(svgFileName, 'image/svg+xml', function(xml) {
				$(appendElem).append(xml.documentElement);
  				var svg = document.getElementsByTagName('svg')[0];
				var box = svg.viewBox.baseVal;
				box.y = (box.y == 0 ? yOffset : box.y);
				svg.setAttribute('viewBox', box.x + ' ' + box.y + ' ' + box.width + ' ' + box.height)

				//.attr("viewBox", "0 0 400 400");

				var floor = self.extractConfRoomData();

				$('#floor-title').append('Floorplan for ' + floor.bldg + '.' + floor.floor);


				// fix initialize to support an override of data
				// should we also pass in the 'elem' to attach this to?
				// or should this be a different method?
				self.floorPlan.initialize(floor.bldg, floor.floor, floor.rooms, {editable: true});

				// save in Mongo DB

			});
		
		},

		extractConfRoomData: function() {

			var gElems = $('#i-rmnames').children(),
			    len = gElems.length,
			    confRooms = [],
			    gText = [],
			    bldg = '',
			    floor = '';

			if(len === 0) {
				// if zero, both loops below fall through. 
				// however, would like to note that this failed

				// change this to error handling
				console.log('No conference room names found');
				return;
			}

			for(var i=0; i<len; i++) {
				var id = gElems[i].id;

				if (id.substring(0, 5) == 'TEXT_') {

					var x = Math.floor(parseInt(gElems[i].getElementsByTagName('text')[0].getAttribute('transform').split(' ')[4])/this.xCoordFactor);
					var y = Math.floor(parseInt(gElems[i].getElementsByTagName('text')[0].getAttribute('transform').split(' ')[5])/this.yCoordFactor);
					var idx = gText.push({
						elem: gElems[i].getElementsByTagName('text')[0],
						value: gElems[i].getElementsByTagName('text')[0].textContent, 
						x: x,
						y: y
					});
					//console.log(gText[idx - 1]);
				}
			}

			for(var k=0; k<gText.length; k++) {
				var textVal = gText[k].value;

				//console.log(k + ': ' + textVal);

				if(textVal == 'CONF ROOM') {
					var confRoomNum = gText[k-1].value,
					    confRoomName = gText[k+1].value.replace(/^\"+|\"+$/g,''),
					    confRoomNumSplit = confRoomNum.split('.'),
					    location = confRoomNumSplit[2];

					    if(bldg == '') bldg = confRoomNumSplit[0];
					    if(floor == '') floor = confRoomNumSplit[1];

					//console.log(confRoomNum + ' - ' + confRoomName);
					//console.log({x: gText[k].x, y: gText[k].y, width: 8, height: 8, name: confRoomName, bldg: bldg, floor: floor, location: location});
					// CARPOOL
					// 17.5.051 

					// {x:63, y:12, width:18, height:14, name:'Leeds', color: '#FC7F08', bldg:'17', floor:'1', location:'010'},
					confRooms.push({x: gText[k].x, y: gText[k].y, color: '#FC7F08', width: this.roomMinWidth, height: this.roomMinHeight, name: this.initCap(confRoomName), bldg: bldg, floor: floor, location: location,
							svgTextElem: gText[k+1].elem});


				}

				//$('#i-rmnames').children()[3].getElementsByTagName('text')[0].textContent
				// $('#i-rmnames').children()[3].getElementsByTagName('text')[0].getAttribute('transform')
				// $('svg')[0].getAttribute('width')
			}

			// put the rooms in left to right order, if rooms have same X position (could make this fuzzy) 
			// then look to y to order top to bottom
			confRooms.sort(function(a,b) {
				var cmp = a.x - b.x;
				if(cmp == 0) cmp = a.y - b.y;
				return cmp;
			});

			return {bldg: bldg, floor: floor, rooms: confRooms};

		},

		initCap : function (str) {
   			return str.toLowerCase().replace(/(?:^|\s)[a-z]/g, function (chr) {
      			return chr.toUpperCase();
   			});
		}

	};

	return FloorPlanEditor;
});