define([],

function () {

	"use strict";

	var FloorPlan = {

		width: 800,
		height: 800,
		xScale: null,
		yScale: null,
		svgContainer: null,

		render: function (bldg, floor) {
			this.getRoomData(bldg, floor);

			this.drawRects(roomData);
			this.drawLabels(roomData);
		},

		// this is really initialize... TODO: rename
		drawRooms: function (bldg, floor) { 
			var roomData = this.getRoomData(bldg, floor);
console.log(roomData);

			var that = this;

			this.width = $( window ).width();
			this.height = $( window ).height();

			this.xScale = d3.scale.linear()
				.domain([0, d3.max(roomData, function(d) { return d.x + d.width; })])
				.range([0, this.width]);
		    this.yScale = d3.scale.linear()
				.domain([0, d3.max(roomData, function(d) { return d.y + d.height; })])
				.range([0, this.height]);
			this.svgContainer = d3.select('body').append('svg')
				.attr('width', this.width)
				.attr('height', this.height);

			this.render(bldg, floor);

			$("#seventeen-5").click(function() {
				that.render(that.getRoomData(17, 5));
			});
			$("#seventeen-4").click(function() {
				that.render(that.getRoomData(17, 4));
			});
			$("#seventeen-3").click(function() {
				that.render(that.getRoomData(17, 3));
			});
			$("#seventeen-2").click(function() {
				that.render(that.getRoomData(17, 2));
			});
			$("#seventeen-1").click(function() {
				that.render(that.getRoomData(17, 1));
			});
		},

		drawRects: function(roomData) {

			var that = this;

			var rect = this.svgContainer.selectAll('rect')
				.data(roomData);

			// enter
			rect.enter()
				.append('rect');

			// update

			rect.attr('x', function (d) { return that.xScale(d.x); })
				.attr('y', function (d) { return that.yScale(d.y); })
				.attr('width', function (d) { return that.xScale(d.width); })
				.attr('height', function (d) { return that.yScale(d.height); })
				.style('fill', function(d) { return d.color })
				.on('click', function (d, i) {
					// shift the object to the right by changing data model +1
					d.x = d.x + 1;

					// select the object clicked on
					d3.select(this)
						.style('fill', 'red')    // change to red
						.attr('x', that.xScale(d.x)); // reset x position to new value (move right)

					// also move the associated room label with the room
					d3.select('#room-label-' + i).attr('x', that.xScale(d.x));
					
					return;

				}); // end of onclick

			rect.exit().remove();
		},

		drawLabels: function(roomData) {

			var that = this,
			    text = this.svgContainer.selectAll('.room-label').data(roomData)

			// called when there are new data items to join
			text.enter()
				.append('foreignObject');
				
			// called when there are data items that require a visual update
			text.attr('class', function(d) { return 'room-label'; })
				.attr('id', function(d, i) { return 'room-label-' + i; })
				.attr('x', function(d) { return that.xScale(d.x); })
				.attr('y', function(d) { return that.yScale(d.y); })
				.attr('width', function (d) { return that.xScale(d.width); })
				.attr('height', function (d) { return that.yScale(d.height); })
				.text(function(d) { return d.name; });

			// called for data items that have been removed
			text.exit().remove();
		},

		getRoomData: function(bldg, floor) {
			// may want to have this sectioned as array of sites containing array of buildings 
			// containing array of floors containing array of conf rooms
			var rooms = [

				// floor 1
				[

				// top
				{x:40, y:0, width:12, height:8, name:'Clean Coal', color: '#FC7F08', bldg:'17', floor:'5', location:'019'},
				{x:40, y:9, width:10, height:8, name:'Wind Farm', color: '#FC7F08', bldg:'17', floor:'5', location:'018'},
				{x:40, y:18, width:10, height:8, name:'Particulates', color: '#FC7F08', bldg:'17', floor:'5', location:'017'},

				{x:83, y:0, width:16, height:8, name:'Global Dimming', color: '#4293F7', bldg:'17', floor:'5', location:'099'},
				{x:89, y:9, width:10, height:8, name:'Greenhouse Gases', color: '#4293F7', bldg:'17', floor:'5', location:'099'},
				{x:89, y:18, width:10, height:8, name:'Algae Farm', color: '#4293F7', bldg:'17', floor:'5', location:'099'},


				// middle
				{x:8, y:28, width:8, height:8, name:'CFC', color: '#FC7F08', bldg:'17', floor:'5', location:'099'},
				{x:8, y:37, width:8, height:8, name:'Indoor Quality', color: '#F2CC1F', bldg:'17', floor:'5', location:'099'},

				{x:17, y:28, width:8, height:8, name:'VOC', color: '#FC7F08', bldg:'17', floor:'5', location:'099'},
				{x:17, y:37, width:8, height:8, name:'Green Seal', color: '#F2CC1F', bldg:'17', floor:'5', location:'099'},

				{x:26, y:28, width:12, height:8, name:'Thermal Comfort', color: '#FC7F08', bldg:'17', floor:'5', location:'099'},
				{x:26, y:37, width:12, height:8, name:'Car Pool', color: '#F2CC1F', bldg:'17', floor:'5', location:'099'},

				{x:40, y:28, width:12, height:17, name:'Kitchen', color: '#D4D4D4', bldg:'17', floor:'5', location:'099'},

				{x:59, y:28, width:8, height:8, name:'Hybrid', color: '#CC66FE', bldg:'17', floor:'5', location:'099'},
				{x:59, y:37, width:8, height:8, name:'Wind Energy', color: '#CC66FE', bldg:'17', floor:'5', location:'099'},

				{x:69, y:28, width:12, height:17, name:'Rest Room', color: '#D4D4D4', bldg:'17', floor:'5', location:'099'},
				{x:83, y:28, width:12, height:17, name:'Elevator', color: '#D4D4D4', bldg:'17', floor:'5', location:'099'},

				{x:100, y:28, width:8, height:8, name:'Thermal Comfort', color: '#4293F7', bldg:'17', floor:'5', location:'099'},
				{x:100, y:37, width:8, height:8, name:'Car Pool', color: '#5FB632', bldg:'17', floor:'5', location:'099'},

				// bottom
				{x:40, y:47, width:10, height:8, name:'Paperless', color: '#F2CC1F', bldg:'17', floor:'5', location:'099'},
				{x:40, y:56, width:10, height:8, name:'Emissions', color: '#F2CC1F', bldg:'17', floor:'5', location:'099'},
				{x:40, y:65, width:12, height:8, name:'Clean Air', color: '#F2CC1F', bldg:'17', floor:'5', location:'099'},

				{x:89, y:47, width:10, height:8, name:'Ride the Bus', color: '#5FB632', bldg:'17', floor:'5', location:'099'},
				{x:89, y:56, width:10, height:8, name:'Carbon Footprint', color: '#5FB632', bldg:'17', floor:'5', location:'099'},
				{x:83, y:65, width:16, height:8, name:'Clean Neutral', color: '#5FB632', bldg:'17', floor:'5', location:'099'}

				], // end of floor 1

				// floor 2
				[
				// top
				{x:60, y:0, width:12, height:8, name:'Rain Forest', color: '#FC7F08', bldg:'17', floor:'2', location:'019'},
				{x:60, y:9, width:10, height:8, name:'Tropical Storm', color: '#FC7F08', bldg:'17', floor:'2', location:'018'},
				{x:60, y:18, width:10, height:8, name:'Chat Room', color: '#FC7F08', bldg:'17', floor:'2', location:'017'}
				],

				// floor 3
				[
				// top
				{x:60, y:0, width:12, height:8, name:'Rain Forest', color: '#FC7F08', bldg:'17', floor:'2', location:'019'},
				{x:60, y:9, width:10, height:8, name:'Tropical Storm', color: '#FC7F08', bldg:'17', floor:'2', location:'018'},
				{x:60, y:18, width:10, height:8, name:'Chat Room', color: '#FC7F08', bldg:'17', floor:'2', location:'017'}
				],

				// floor 4
				[
				// top
				{x:60, y:0, width:12, height:8, name:'Rain Forest', color: '#FC7F08', bldg:'17', floor:'2', location:'019'},
				{x:60, y:9, width:10, height:8, name:'Tropical Storm', color: '#FC7F08', bldg:'17', floor:'2', location:'018'},
				{x:60, y:18, width:10, height:8, name:'Chat Room', color: '#FC7F08', bldg:'17', floor:'2', location:'017'}
				],

				// floor 5
				[

				// top
				{x:40, y:0, width:12, height:8, name:'Clean Coal', color: '#FC7F08', bldg:'17', floor:'5', location:'019'},
				{x:40, y:9, width:10, height:8, name:'Wind Farm', color: '#FC7F08', bldg:'17', floor:'5', location:'018'},
				{x:40, y:18, width:10, height:8, name:'Particulates', color: '#FC7F08', bldg:'17', floor:'5', location:'017'},

				{x:83, y:0, width:16, height:8, name:'Global Dimming', color: '#4293F7', bldg:'17', floor:'5', location:'099'},
				{x:89, y:9, width:10, height:8, name:'Greenhouse Gases', color: '#4293F7', bldg:'17', floor:'5', location:'099'},
				{x:89, y:18, width:10, height:8, name:'Algae Farm', color: '#4293F7', bldg:'17', floor:'5', location:'099'},


				// middle
				{x:8, y:28, width:8, height:8, name:'CFC', color: '#FC7F08', bldg:'17', floor:'5', location:'099'},
				{x:8, y:37, width:8, height:8, name:'Indoor Quality', color: '#F2CC1F', bldg:'17', floor:'5', location:'099'},

				{x:17, y:28, width:8, height:8, name:'VOC', color: '#FC7F08', bldg:'17', floor:'5', location:'099'},
				{x:17, y:37, width:8, height:8, name:'Green Seal', color: '#F2CC1F', bldg:'17', floor:'5', location:'099'},

				{x:26, y:28, width:12, height:8, name:'Thermal Comfort', color: '#FC7F08', bldg:'17', floor:'5', location:'099'},
				{x:26, y:37, width:12, height:8, name:'Car Pool', color: '#F2CC1F', bldg:'17', floor:'5', location:'099'},

				{x:40, y:28, width:12, height:17, name:'Kitchen', color: '#D4D4D4', bldg:'17', floor:'5', location:'099'},

				{x:59, y:28, width:8, height:8, name:'Hybrid', color: '#CC66FE', bldg:'17', floor:'5', location:'099'},
				{x:59, y:37, width:8, height:8, name:'Wind Energy', color: '#CC66FE', bldg:'17', floor:'5', location:'099'},

				{x:69, y:28, width:12, height:17, name:'Rest Room', color: '#D4D4D4', bldg:'17', floor:'5', location:'099'},
				{x:83, y:28, width:12, height:17, name:'Elevator', color: '#D4D4D4', bldg:'17', floor:'5', location:'099'},

				{x:100, y:28, width:8, height:8, name:'Thermal Comfort', color: '#4293F7', bldg:'17', floor:'5', location:'099'},
				{x:100, y:37, width:8, height:8, name:'Car Pool', color: '#5FB632', bldg:'17', floor:'5', location:'099'},

				// bottom
				{x:40, y:47, width:10, height:8, name:'Paperless', color: '#F2CC1F', bldg:'17', floor:'5', location:'099'},
				{x:40, y:56, width:10, height:8, name:'Emissions', color: '#F2CC1F', bldg:'17', floor:'5', location:'099'},
				{x:40, y:65, width:12, height:8, name:'Clean Air', color: '#F2CC1F', bldg:'17', floor:'5', location:'099'},

				{x:89, y:47, width:10, height:8, name:'Ride the Bus', color: '#5FB632', bldg:'17', floor:'5', location:'099'},
				{x:89, y:56, width:10, height:8, name:'Carbon Footprint', color: '#5FB632', bldg:'17', floor:'5', location:'099'},
				{x:83, y:65, width:16, height:8, name:'Clean Neutral', color: '#5FB632', bldg:'17', floor:'5', location:'099'}
				]


			];

			return rooms[floor];

		}

	};

	return FloorPlan;
});