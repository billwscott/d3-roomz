define([],

function () {

	"use strict";

	var FloorPlan = {

		width: 800,
		height: 400,
		margin: 100,
		top: 0,
		left: 0,
		xScale: null,
		yScale: null,
		svgContainer: null,
		rect: null,
		text: null,
		roomData: null,
		buttonsDrawn: false,
		options: {
			editable: false
		},

		render: function (bldg, floor, roomData) {

			// if room data is passed in use it as override
			if(roomData != null) {
				this._renderCB(bldg, floor, roomData);
			} else
			{
				this.fetchRoomData(bldg, floor, this._renderCB);
			}
		},

		_renderCB: function (bldg, floor, roomData) {

			this.xScale
				.domain([0, d3.max(roomData, function(d) { return d.x + d.width; })])
				.range([0, this.width]);

		    this.yScale
		    	.domain([0, d3.max(roomData, function(d) { return d.y + d.height; })])
				.range([0, this.height]);
			
			this.svgContainer
				.attr('x', 100)
				.attr('width', this.width)
				.attr('height', this.height)
				.attr('class', 'svg-container');

			this.roomData = roomData;
			this.drawButtons(bldg, floor, roomData);
			this.drawRects(roomData);
			this.drawLabels(roomData);
			this.drawLegend(roomData);

		},

		initialize: function (bldg, floor, roomData, options) { 

			this.svgContainer = d3.select('.floor-container')
				.append('svg');


			this.xScale = d3.scale.linear();
			this.yScale = d3.scale.linear();

			this.width = $( '.floor-container' ).width();
			this.height = $( '.floor-container' ).height();

			this.options = options;

			this.render(bldg, floor, roomData);
	
		},

		drawButtons: function(bldg, floor, roomData) {

			if(this.buttonsDrawn)
				return;


			var self = this,
				numFloors = this.getNumFloors();

			// should really use a dust partial here
			for (var i=0; i<numFloors; i++) {
				var floor = i+1;
				var id = bldg + '-' + floor;
				$('#floor-controls').append('<button class="btn btn-default" id="' + id + '">Floor ' + floor + '</button>');

				var handleClick = (function(f){
				    
				    return function() {
				        self.render(bldg, f, null);
				    };
				})(floor);

				$('#'+id).click(handleClick);

				this.buttonsDrawn = true;
			}
		},

		drawRects: function(roomData) {

			var self = this,
				selectedRoom = null;

			var rect = this.svgContainer.selectAll('rect')
				.data(roomData);
			this.rect = rect;

			// enter
			rect.enter()
				.append('rect');

			// update

			rect.transition()
				.attr('x', function (d) { return self.xScale(d.x); })
				.attr('y', function (d) { return self.yScale(d.y); })
				.attr('width', function (d) { return self.xScale(d.width); })
				.attr('height', function (d) { return self.yScale(d.height); })
				.style('fill', function(d) { return d.color });

			if(this.options.editable == true) {
				rect.on('click', function (d, i) {
					if(selectedRoom != null) {
						d3.select(selectedRoom.elem)
							.style('stroke-width', 0);
						selectedRoom.svgTextElem.setAttribute('font-size', '1');
					}

					d3.select(this)
						.style('stroke-width', 2) 
						.style('stroke', 'black');

					d.svgTextElem.setAttribute('font-size', '16');
					selectedRoom = {elem: this, data: d, idx: i, svgTextElem: d.svgTextElem};

					return;
				});

				d3.select('body')
					.on('keydown', function(d,i) {
					self.adjustRoom(event, selectedRoom.elem, selectedRoom.data, selectedRoom.idx);
					return;

				});

			} else {
				rect.on('click', function (d, i) {
					
					// Try to reserve this room
					self.bookRoom(d);
					return;

				}); // end of onclick
			}

			rect.exit().transition().remove();
		},

		adjustRoom: function(event, roomElem, data, idx) {

			switch(event.keyCode) {
				case 38: // up
					if(event.ctrlKey)
						this.growVertical(event, roomElem, data, idx, -1);
					else
						this.moveVertical(event, roomElem, data, idx, -1);
					break;
				case 40: // down
					if(event.ctrlKey)
						this.growVertical(event, roomElem, data, idx, 1);
					else
						this.moveVertical(event, roomElem, data, idx, 1);
					break;
				case 37: // left
					if(event.ctrlKey)
						this.growHorizontal(event, roomElem, data, idx, -1);
					else
						this.moveHorizontal(event, roomElem, data, idx, -1);
					break;
				case 39: // right
					if(event.ctrlKey)
						this.growHorizontal(event, roomElem, data, idx, 1);
					else
						this.moveHorizontal(event, roomElem, data, idx, 1);

					break;
			}
		},

		moveVertical: function(event, roomElem, data, idx, dir) {
			var incr = 0.1 * dir;
			if(event.shiftKey)
				incr *=10;

			this.roomData[idx].y += incr; 
			data.y = data.y + incr;

			// select the object clicked on
			d3.select(roomElem)
				.attr('y', this.yScale(data.y)); // reset y position to new value (move up)

			// also move the associated room label with the room
			d3.select('#room-label-' + idx).attr('y', this.yScale(data.y));

		},


		moveHorizontal: function(event, roomElem, data, idx, dir) {
			var incr = 0.1 * dir;
			if(event.shiftKey)
				incr *=10;

			this.roomData[idx].x += incr; 
			data.x = data.x + incr;

			// select the object clicked on
			d3.select(roomElem)
				.attr('x', this.xScale(data.x)); // reset y position to new value (move up)

			// also move the associated room label with the room
			d3.select('#room-label-' + idx).attr('x', this.xScale(data.x));

		},

		growHorizontal: function(event, roomElem, data, idx, dir) {
			var incr = 0.1 * dir;
			if(event.shiftKey)
				incr *=10;

			this.roomData[idx].width += incr; 
			data.width = data.width + incr;

			// select the object clicked on
			d3.select(roomElem)
				.attr('width', this.xScale(data.width)); // reset y position to new value (move up)

			// also move the associated room label with the room
			//d3.select('#room-label-' + idx).attr('x', this.xScale(data.width/2));

		},

		growVertical: function(event, roomElem, data, idx, dir) {
			var incr = 0.1 * dir;
			if(event.shiftKey)
				incr *=10;

			this.roomData[idx].height += incr; 
			data.height = data.height + incr;

			// select the object clicked on
			d3.select(roomElem)
				.attr('height', this.yScale(data.height)); 

			// also move the associated room label with the room
			//d3.select('#room-label-' + idx).attr('x', this.xScale(data.width/2));

		},


		drawLabels: function(roomData) {

			var self = this,
			    text = this.svgContainer.selectAll('.room-label').data(roomData)

			this.text = text;

			// called when there are new data items to join
			text.enter()
				.append('foreignObject');
				
			// called when there are data items self require a visual update
			text.transition().attr('class', function(d) { return 'room-label'; })
				.attr('id', function(d, i) { return 'room-label-' + i; })
				.attr('x', function(d) { return self.xScale(d.x); })
				.attr('y', function(d) { return self.yScale(d.y); })
				.attr('width', function (d) { return self.xScale(d.width); })
				.attr('height', function (d) { return self.yScale(d.height); })
				.text(function(d) { return d.name; });


			text.on('click', function (d, i) {
					self.bookRoom(d);
					return;
				}); // end of onclick

			// called for data items self have been removed
			text.exit().transition().remove();
		},

		drawLegend: function(roomData) {
			$('.legend-item').remove();
			for(var i=0; i<roomData.length; i++) {
				$('#legend-list').append('<li class="legend-item">' + roomData[i].name + '</li>');
			}

		},

		bookRoom: function(roomDatum) {
			console.log('Book this room:' + roomDatum.bldg + ' /' + roomDatum.bldg + '.' + 
				roomDatum.floor + '.' + roomDatum.location + ' ' + roomDatum.name);
		},

		// TODO: change to fetchFloorData
		fetchRoomData: function(bldg, floor, renderRooms) {

			var self = this;
			$.ajax({
				//url: '/getRoomData?bldg=' + bldg + '&floor=' + floor,
				url: '/getRooms/' + bldg + '/floor/' + floor,
				type: "GET",
				dataType: "json",
				data: {objectData: {'data': 'test'}},
				contentType: "application/json",
				cache: false,
				timeout: 5000,

				complete: function() {
					//console.log('process complete');
				},

				success: function(data) {
					//console.log('process sucess');
					//console.log(data);
					renderRooms.call(self, bldg, floor, data);
				},

				error: function() {
					console.log('process error');
				},
			});
		},

		loadSVGFile: function(svgFileName, appendElem) {
			d3.xml(svgFileName, "image/svg+xml", function(xml) {
  				//document.body.appendChild(xml.documentElement);
  				$(appendElem).append(xml.documentElement);
			});
		
		},

		getNumFloors: function() {
			var numFloors = 0;

			for (var i=0; i<this.roomData.length; i++) {

				if (parseInt(this.roomData[i].floor) > numFloors) {
					numFloors = this.roomData[i].floor;
				}		
			}

			return numFloors;
		}

	};

	return FloorPlan;
});