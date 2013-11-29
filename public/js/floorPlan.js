define([],

function () {

	"use strict";

	var FloorPlan = {

		width: 800,
		height: 800,
		margin: 50,
		xScale: null,
		yScale: null,
		svgContainer: null,
		rect: null,
		text: null,
		roomData: null,

		render: function (bldg, floor) {
			this.fetchRoomData(bldg, floor, this._renderCB);
		},

		_renderCB: function (roomData) {

			this.xScale
				.domain([0, d3.max(roomData, function(d) { return d.x + d.width; })])
				.range([0, this.width]);

		    this.yScale
		    	.domain([0, d3.max(roomData, function(d) { return d.y + d.height; })])
				.range([0, this.height]);
			
			this.svgContainer
				.attr('width', this.width)
				.attr('height', this.height);

			this.roomData = roomData;
			this.drawRects(roomData);
			this.drawLabels(roomData);

		},

		initialize: function (bldg, floor) { 

			var self = this;
			this.svgContainer = d3.select('body').append('svg');
			this.xScale = d3.scale.linear();
			this.yScale = d3.scale.linear();

			this.width = $( window ).width() - this.margin;
			this.height = $( window ).height() - this.margin;

			this.render(bldg, floor);

			$("#seventeen-5").click(function() {
				self.render(17, 5);
			});
			$("#seventeen-4").click(function() {
				self.render(17, 4);
			});
			$("#seventeen-3").click(function() {
				self.render(17, 3);
			});
			$("#seventeen-2").click(function() {
				self.render(17, 2);
			});
			$("#seventeen-1").click(function() {
				self.render(17, 1);
			});
		},

		drawRects: function(roomData) {

			var self = this;

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

			rect.on('click', function (d, i) {
					// shift the object to the right by changing data model +1

					//self.roomData[i].x += 1; 
					//d.x = d.x + 1;

					// select the object clicked on
					//d3.select(this)
						// .style('fill', 'red')    // change to red
						// .attr('x', self.xScale(d.x)); // reset x position to new value (move right)

					// also move the associated room label with the room
					// d3.select('#room-label-' + i).attr('x', self.xScale(d.x));
					
					// Try to reserve this room
					self.bookRoom(d);
					return;

				}); // end of onclick

			rect.exit().transition().remove();
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

		bookRoom: function(roomDatum) {
			console.log('Book this room:' + roomDatum.bldg + ' /' + roomDatum.bldg + '.' + 
				roomDatum.floor + '.' + roomDatum.location + ' ' + roomDatum.name);
		},

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
					renderRooms.call(self, data);
				},

				error: function() {
					console.log('process error');
				},
			});
		}

	};

	return FloorPlan;
});