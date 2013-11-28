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
			this.roomData = this.getRoomData(bldg, floor);

			this.drawRects(this.roomData);
			this.drawLabels(this.roomData);
		},

		initialize: function (bldg, floor) { 
			var roomData = this.getRoomData(bldg, floor);

			var that = this;

			this.width = $( window ).width() - this.margin;
			this.height = $( window ).height() - this.margin;

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
				that.render(17, 5);
			});
			$("#seventeen-4").click(function() {
				that.render(17, 4);
			});
			$("#seventeen-3").click(function() {
				that.render(17, 3);
			});
			$("#seventeen-2").click(function() {
				that.render(17, 2);
			});
			$("#seventeen-1").click(function() {
				that.render(17, 1);
			});
		},

		drawRects: function(roomData) {

			var that = this;

			var rect = this.svgContainer.selectAll('rect')
				.data(roomData);
			this.rect = rect;

			// enter
			rect.enter()
				.append('rect');

			// update

			rect.transition()
				.attr('x', function (d) { return that.xScale(d.x); })
				.attr('y', function (d) { return that.yScale(d.y); })
				.attr('width', function (d) { return that.xScale(d.width); })
				.attr('height', function (d) { return that.yScale(d.height); })
				.style('fill', function(d) { return d.color });

			rect.on('click', function (d, i) {
					// shift the object to the right by changing data model +1

					//that.roomData[i].x += 1; 
					//d.x = d.x + 1;

					// select the object clicked on
					//d3.select(this)
						// .style('fill', 'red')    // change to red
						// .attr('x', that.xScale(d.x)); // reset x position to new value (move right)

					// also move the associated room label with the room
					// d3.select('#room-label-' + i).attr('x', that.xScale(d.x));
					
					// Try to reserve this room
					that.bookRoom(d);
					return;

				}); // end of onclick

			rect.exit().transition().remove();
		},

		drawLabels: function(roomData) {

			var that = this,
			    text = this.svgContainer.selectAll('.room-label').data(roomData)

			this.text = text;

			// called when there are new data items to join
			text.enter()
				.append('foreignObject');
				
			// called when there are data items that require a visual update
			text.transition().attr('class', function(d) { return 'room-label'; })
				.attr('id', function(d, i) { return 'room-label-' + i; })
				.attr('x', function(d) { return that.xScale(d.x); })
				.attr('y', function(d) { return that.yScale(d.y); })
				.attr('width', function (d) { return that.xScale(d.width); })
				.attr('height', function (d) { return that.yScale(d.height); })
				.text(function(d) { return d.name; });


			text.on('click', function (d, i) {
					that.bookRoom(d);
					return;
				}); // end of onclick

			// called for data items that have been removed
			text.exit().transition().remove();
		},

		bookRoom: function(roomDatum) {
			console.log('Book this room:' + roomDatum.bldg + ' /' + roomDatum.bldg + '.' + 
				roomDatum.floor + '.' + roomDatum.location + ' ' + roomDatum.name);
		},

		getRoomData: function(bldg, floor) {
			// may want to have this sectioned as array of sites containing array of buildings 
			// containing array of floors containing array of conf rooms
			var rooms = [

				// floor 1
				[

				// top
				{x:80, y:0, width:16, height:12, name:'Clean Coal', color: '#FC7F08', bldg:'17', floor:'5', location:'019'},

				], // end of floor 1

				// floor 2
				[
				// top
				{x:40, y:0, width:12, height:8, name:'Water Harvest', color: '#FC7F08', bldg:'17', floor:'2', location:'019'},
				{x:40, y:9, width:10, height:8, name:'Tropical Storm', color: '#FC7F08', bldg:'17', floor:'2', location:'018'},
				{x:40, y:18, width:10, height:8, name:'Chat Room ', color: '#FC7F08', bldg:'17', floor:'2', location:'017'},

				{x:83, y:0, width:16, height:8, name:'Rain Forest', color: '#4293F7', bldg:'17', floor:'2', location:'012'},
				{x:89, y:9, width:10, height:8, name:'Irrigation', color: '#4293F7', bldg:'17', floor:'2', location:'011'},
				{x:89, y:18, width:10, height:8, name:'Wild Salmon', color: '#4293F7', bldg:'17', floor:'2', location:'010'},


				// middle
				{x:8, y:28, width:8, height:8, name:'Water Conservation', color: '#FC7F08', bldg:'17', floor:'2', location:'064'},
				{x:8, y:37, width:8, height:8, name:'Cradle to Cradle', color: '#F2CC1F', bldg:'17', floor:'2', location:'053'},

				{x:17, y:28, width:8, height:8, name:'Wave Power', color: '#FC7F08', bldg:'17', floor:'2', location:'063'},
				{x:17, y:37, width:8, height:8, name:'Ground Water', color: '#F2CC1F', bldg:'17', floor:'2', location:'052'},

				{x:26, y:28, width:12, height:8, name:'Clean Water', color: '#FC7F08', bldg:'17', floor:'2', location:'062'},
				{x:26, y:37, width:12, height:8, name:'Hydro Power', color: '#F2CC1F', bldg:'17', floor:'2', location:'051'},

				{x:40, y:28, width:12, height:17, name:'Kitchen', color: '#D4D4D4', bldg:'17', floor:'2', location:'000'},

				{x:59, y:28, width:8, height:8, name:'Coral Reefs', color: '#CC66FE', bldg:'17', floor:'2', location:'014'},
				{x:59, y:37, width:8, height:8, name:'Wetlands', color: '#CC66FE', bldg:'17', floor:'2', location:'044'},

				{x:69, y:28, width:12, height:17, name:'Rest Room', color: '#D4D4D4', bldg:'17', floor:'2', location:'000'},
				{x:83, y:28, width:12, height:17, name:'Elevator', color: '#D4D4D4', bldg:'17', floor:'2', location:'000'},

				{x:100, y:28, width:8, height:8, name:'Rainfall', color: '#4293F7', bldg:'17', floor:'2', location:'020'},
				{x:100, y:37, width:8, height:8, name:'Storm Water', color: '#5FB632', bldg:'17', floor:'2', location:'034'},

				// bottom
				{x:40, y:47, width:10, height:8, name:'Purification', color: '#F2CC1F', bldg:'17', floor:'2', location:'047'},
				{x:40, y:56, width:10, height:8, name:'Ocean Thermal Energy', color: '#F2CC1F', bldg:'17', floor:'2', location:'048'},
				{x:40, y:65, width:12, height:8, name:'Aquifier', color: '#F2CC1F', bldg:'17', floor:'2', location:'049'},

				{x:89, y:47, width:10, height:8, name:'Offline', color: '#5FB632', bldg:'17', floor:'2', location:'040'},
				{x:89, y:56, width:10, height:8, name:'Bioswale', color: '#5FB632', bldg:'17', floor:'2', location:'041'},
				{x:83, y:65, width:16, height:8, name:'Water Savings', color: '#5FB632', bldg:'17', floor:'2', location:'042'}
				],

				// floor 3
				[
				// top
				{x:40, y:0, width:12, height:8, name:'Geo Thermal', color: '#FC7F08', bldg:'17', floor:'3', location:'019'},
				{x:40, y:9, width:10, height:8, name:'Rapidly Renewable', color: '#FC7F08', bldg:'17', floor:'3', location:'018'},
				{x:40, y:18, width:10, height:8, name:'Urban Density ', color: '#FC7F08', bldg:'17', floor:'3', location:'017'},

				{x:83, y:0, width:16, height:8, name:'Remediation', color: '#4293F7', bldg:'17', floor:'3', location:'012'},
				{x:89, y:9, width:10, height:8, name:'Biomass', color: '#4293F7', bldg:'17', floor:'3', location:'011'},
				{x:89, y:18, width:10, height:8, name:'Offline', color: '#4293F7', bldg:'17', floor:'3', location:'010'},


				// middle
				{x:8, y:28, width:8, height:8, name:'Global Warming', color: '#FC7F08', bldg:'17', floor:'3', location:'064'},
				{x:8, y:37, width:8, height:8, name:'Regional Material', color: '#F2CC1F', bldg:'17', floor:'3', location:'053'},

				{x:17, y:28, width:8, height:8, name:'Sprawl', color: '#FC7F08', bldg:'17', floor:'3', location:'063'},
				{x:17, y:37, width:8, height:8, name:'Fossil Fuels', color: '#F2CC1F', bldg:'17', floor:'3', location:'052'},

				{x:26, y:28, width:12, height:8, name:'Ecosystem', color: '#FC7F08', bldg:'17', floor:'3', location:'062'},
				{x:26, y:37, width:12, height:8, name:'Heat Pump', color: '#F2CC1F', bldg:'17', floor:'3', location:'051'},

				{x:40, y:28, width:12, height:17, name:'Kitchen', color: '#D4D4D4', bldg:'17', floor:'3', location:'000'},

				{x:59, y:28, width:8, height:8, name:'Reclaimed Land', color: '#CC66FE', bldg:'17', floor:'3', location:'014'},
				{x:59, y:37, width:8, height:8, name:'Organic', color: '#CC66FE', bldg:'17', floor:'3', location:'044'},

				{x:69, y:28, width:12, height:17, name:'Rest Room', color: '#D4D4D4', bldg:'17', floor:'3', location:'000'},
				{x:83, y:28, width:12, height:17, name:'Elevator', color: '#D4D4D4', bldg:'17', floor:'3', location:'000'},

				{x:100, y:28, width:8, height:8, name:'Certified Wood', color: '#4293F7', bldg:'17', floor:'3', location:'020'},
				{x:100, y:37, width:8, height:8, name:'Sustainable Forest', color: '#5FB632', bldg:'17', floor:'3', location:'034'},

				// bottom
				{x:40, y:47, width:10, height:8, name:'Ecoforestry', color: '#F2CC1F', bldg:'17', floor:'3', location:'047'},
				{x:40, y:56, width:10, height:8, name:'Cryosphere', color: '#F2CC1F', bldg:'17', floor:'3', location:'048'},
				{x:40, y:65, width:12, height:8, name:'Habitat Conserv', color: '#F2CC1F', bldg:'17', floor:'3', location:'049'},

				{x:89, y:47, width:10, height:8, name:'El Nino', color: '#5FB632', bldg:'17', floor:'3', location:'040'},
				{x:89, y:56, width:10, height:8, name:'Green Roof', color: '#5FB632', bldg:'17', floor:'3', location:'041'},
				{x:83, y:65, width:16, height:8, name:'Recycle', color: '#5FB632', bldg:'17', floor:'3', location:'042'}
				],
				// floor 4
				[
				// top
				{x:40, y:0, width:12, height:8, name:'Passive Solar', color: '#FC7F08', bldg:'17', floor:'4', location:'019'},
				{x:40, y:9, width:10, height:8, name:'Solar Power', color: '#FC7F08', bldg:'17', floor:'4', location:'018'},
				{x:40, y:18, width:10, height:8, name:'Light Shelf ', color: '#FC7F08', bldg:'17', floor:'4', location:'017'},

				{x:83, y:0, width:16, height:8, name:'Ozone Layer', color: '#4293F7', bldg:'17', floor:'4', location:'012'},
				{x:89, y:9, width:10, height:8, name:'Alternative Energy', color: '#4293F7', bldg:'17', floor:'4', location:'011'},
				{x:89, y:18, width:10, height:8, name:'Offline', color: '#4293F7', bldg:'17', floor:'4', location:'000'},


				// middle
				{x:8, y:28, width:8, height:8, name:'Sustainablity', color: '#FC7F08', bldg:'17', floor:'4', location:'064'},
				{x:8, y:37, width:8, height:8, name:'Solar Water', color: '#F2CC1F', bldg:'17', floor:'4', location:'053'},

				{x:17, y:28, width:8, height:8, name:'EPA', color: '#FC7F08', bldg:'17', floor:'4', location:'063'},
				{x:17, y:37, width:8, height:8, name:'Light Control', color: '#F2CC1F', bldg:'17', floor:'4', location:'052'},

				{x:26, y:28, width:12, height:8, name:'Think Globally', color: '#FC7F08', bldg:'17', floor:'4', location:'062'},
				{x:26, y:37, width:12, height:8, name:'Reuse', color: '#F2CC1F', bldg:'17', floor:'4', location:'051'},

				{x:40, y:28, width:12, height:17, name:'Kitchen', color: '#D4D4D4', bldg:'17', floor:'4', location:'000'},

				{x:59, y:28, width:8, height:8, name:'Daylight', color: '#CC66FE', bldg:'17', floor:'4', location:'014'},
				{x:59, y:37, width:8, height:8, name:'Off the Grid', color: '#CC66FE', bldg:'17', floor:'4', location:'044'},

				{x:69, y:28, width:12, height:17, name:'Rest Room', color: '#D4D4D4', bldg:'17', floor:'4', location:'000'},
				{x:83, y:28, width:12, height:17, name:'Elevator', color: '#D4D4D4', bldg:'17', floor:'4', location:'000'},

				{x:100, y:28, width:8, height:8, name:'Photovoltaic', color: '#4293F7', bldg:'17', floor:'4', location:'020'},
				{x:100, y:37, width:8, height:8, name:'Green Building', color: '#5FB632', bldg:'17', floor:'4', location:'034'},

				// bottom
				{x:40, y:47, width:10, height:8, name:'Go Green', color: '#F2CC1F', bldg:'17', floor:'4', location:'047'},
				{x:40, y:56, width:10, height:8, name:'Energy Star', color: '#F2CC1F', bldg:'17', floor:'4', location:'048'},
				{x:40, y:65, width:12, height:8, name:'Green Power', color: '#F2CC1F', bldg:'17', floor:'4', location:'049'},

				{x:89, y:47, width:10, height:8, name:'LED', color: '#5FB632', bldg:'17', floor:'4', location:'040'},
				{x:89, y:56, width:10, height:8, name:'US Grn Bldg Council', color: '#5FB632', bldg:'17', floor:'4', location:'041'},
				{x:83, y:65, width:16, height:8, name:'Heat Island', color: '#5FB632', bldg:'17', floor:'4', location:'042'}
				],

				// floor 5
				[

				// top
				{x:40, y:0, width:12, height:8, name:'Clean Coal', color: '#FC7F08', bldg:'17', floor:'5', location:'019'},
				{x:40, y:9, width:10, height:8, name:'Wind Farm', color: '#FC7F08', bldg:'17', floor:'5', location:'018'},
				{x:40, y:18, width:10, height:8, name:'Particulates', color: '#FC7F08', bldg:'17', floor:'5', location:'017'},

				{x:83, y:0, width:16, height:8, name:'Global Dimming', color: '#4293F7', bldg:'17', floor:'5', location:'012'},
				{x:89, y:9, width:10, height:8, name:'Greenhouse Gases', color: '#4293F7', bldg:'17', floor:'5', location:'011'},
				{x:89, y:18, width:10, height:8, name:'Algae Farm', color: '#4293F7', bldg:'17', floor:'5', location:'010'},


				// middle
				{x:8, y:28, width:8, height:8, name:'CFC', color: '#FC7F08', bldg:'17', floor:'5', location:'064'},
				{x:8, y:37, width:8, height:8, name:'Indoor Quality', color: '#F2CC1F', bldg:'17', floor:'5', location:'053'},

				{x:17, y:28, width:8, height:8, name:'VOC', color: '#FC7F08', bldg:'17', floor:'5', location:'063'},
				{x:17, y:37, width:8, height:8, name:'Green Seal', color: '#F2CC1F', bldg:'17', floor:'5', location:'052'},

				{x:26, y:28, width:12, height:8, name:'Thermal Comfort', color: '#FC7F08', bldg:'17', floor:'5', location:'062'},
				{x:26, y:37, width:12, height:8, name:'Car Pool', color: '#F2CC1F', bldg:'17', floor:'5', location:'051'},

				{x:40, y:28, width:12, height:17, name:'Kitchen', color: '#D4D4D4', bldg:'17', floor:'5', location:'000'},

				{x:59, y:28, width:8, height:8, name:'Hybrid', color: '#CC66FE', bldg:'17', floor:'5', location:'014'},
				{x:59, y:37, width:8, height:8, name:'Wind Energy', color: '#CC66FE', bldg:'17', floor:'5', location:'044'},

				{x:69, y:28, width:12, height:17, name:'Rest Room', color: '#D4D4D4', bldg:'17', floor:'5', location:'000'},
				{x:83, y:28, width:12, height:17, name:'Elevator', color: '#D4D4D4', bldg:'17', floor:'5', location:'000'},

				{x:100, y:28, width:8, height:8, name:'Natural Ventilation', color: '#4293F7', bldg:'17', floor:'5', location:'020'},
				{x:100, y:37, width:8, height:8, name:'CO2', color: '#5FB632', bldg:'17', floor:'5', location:'034'},

				// bottom
				{x:40, y:47, width:10, height:8, name:'Paperless', color: '#F2CC1F', bldg:'17', floor:'5', location:'047'},
				{x:40, y:56, width:10, height:8, name:'Emissions', color: '#F2CC1F', bldg:'17', floor:'5', location:'048'},
				{x:40, y:65, width:12, height:8, name:'Clean Air', color: '#F2CC1F', bldg:'17', floor:'5', location:'049'},

				{x:89, y:47, width:10, height:8, name:'Ride the Bus', color: '#5FB632', bldg:'17', floor:'5', location:'040'},
				{x:89, y:56, width:10, height:8, name:'Carbon Footprint', color: '#5FB632', bldg:'17', floor:'5', location:'041'},
				{x:83, y:65, width:16, height:8, name:'Clean Neutral', color: '#5FB632', bldg:'17', floor:'5', location:'042'}
				]


			];
			return rooms[floor-1];

		}

	};

	return FloorPlan;
});