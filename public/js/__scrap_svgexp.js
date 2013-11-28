		drawRect: function () { 
			var svgContainer = d3.select('body').append('svg')
				.attr('width', 200)
				.attr('height', 200);

			//Draw the Rectangle
			var rectangle = svgContainer.append('rect')
				.attr('x', 10)
				.attr('y', 10)
				.attr('width', 50)
				.attr('height', 100)
				.style('fill', function(d) { return '#FC7F08'; });

		},		drawCircles: function() {

			var spaceCircles = [30, 70, 110];

			var svgContainer = d3.select("body").append("svg")
				.attr("width", 200)
				.attr("height", 200);

			var circles = svgContainer.selectAll("circle")
					.data(spaceCircles)
				.enter()
					.append("circle");

			var circleAttributes = circles
				.attr("cx", function (d) { return d; })
				.attr("cy", function (d) { return d; })
				.attr("r", 20 )
				.style("fill", function(d) {
					var returnColor;
					if (d === 30) { returnColor = "green";} 
					else if (d === 70) { returnColor = "purple";} 
					else if (d === 110) { returnColor = "red"; }
					return returnColor;
				});
		},

		drawCirclesWData: function() {

			var jsonCircles = [
				{
					"x_axis": 30,
					"y_axis": 30,
					"radius": 20,
					"color" : "green"
				}, {
					"x_axis": 70,
					"y_axis": 70,
					"radius": 20,
					"color" : "purple"
				}, {
					"x_axis": 110,
					"y_axis": 100,
					"radius": 20,
					"color" : "red"
			}];

			var svgContainer = d3.select("body").append("svg")
				.attr("width", 200)
				.attr("height", 200);

			var circles = svgContainer.selectAll("circle")
					.data(jsonCircles)
				.enter()
					.append("circle")
					.attr("cx", function (d) { return d.x_axis; })
                    .attr("cy", function (d) { return d.y_axis; })
                    .attr("r", function (d) { return d.radius; })
                    .style("fill", function(d) { return d.color; });
		},

		drawPath: function () {
			var width = 800,
				height = 500,
				margin = 10,
				x = d3.scale.linear()
					.domain([0, 100])
					.range([margin, width - margin]),
				y = d3.scale.linear()
					.domain([0, 100])
					.range([margin, height - margin]);

			var line = d3.svg.line() 
				.x(function(d){return x(d.x);})
				.y(function(d){return y(d.y);});

			var svg = d3.select('body').append('svg');

			svg.attr('height', height)
				.attr('width', width);

			svg.selectAll('path')
					.data(getRoomData(0,24,24))
				.enter()
					.append('path') 
					.attr('class', 'clean_coal')
					.attr('d', function(d){return line(d);})
					.style('fill', function(d) { return '#FC7F08'; })
					.text('hello'); ;

			svg.selectAll('path')
					.data(getRoomData(100,24,24))
				.enter()
					.append('path') 
					.attr('class', 'wind_farm')
					.attr('d', function(d){return line(d);})
					.style('fill', function(d) { return '#FC7F08'; })
					.text('hello');	     	

			function getRoomData (offset, width, height) {
				return [
					[
						{x: offset, y: offset},
						{x: width, y: offset},
						{x: width, y: height},
						{x: offset, y:height}
					]
				];
			};

		}
		
/*
						.append("xhtml:body")
							.style("font", "14px 'Helvetica Neue'")
							.style('margin', '0px 0px 0px 0px')
							.style('padding', '0px 0px 0px 0px')
	    					.html('<div class="html-label" style="width: 75px;">' + function(d) {return d.name} + '</div>')
	    					//.selectAll('.html-label')
	    					//	.attr('text', function(d) { return d.name() })
	    					*/
/*
			text = svg.append('foreignObject')
                    .attr('x', 50)
                    .attr('y', 130)
                    .attr('width', 150)
                    .attr('height', 100)
                    .append("xhtml:body")
    				.html('<div style="width: 150px;">This is some information about whatever</div>')
*/
				// wrapping text
				// http://stackoverflow.com/questions/11007640/fit-text-into-svg-element-using-d3-js

/*
			var text = svgContainer.selectAll('text')
					.data(roomData)
				.enter()
					.append('text')
					.attr('id', function(d, i) { return 'room-label-' + i; })
					.attr('x', function(d) { return xScale(d.x+1); })
					.attr('y', function(d) { return xScale(d.y + d.height/2 + 1); })
					.text( function (d) { return d.name; })
					.attr('font-family', 'sans-serif')
					.attr('font-size', '14px')
					.attr('fill', 'black');
*/


//d3.select(d.name.replace(/\s+/g, '')).attr('x', xScale(d.x+1));

						//d3.select(this).filter(function(p) { return d === p; }).attr('x', xScale(d.x+1));


					//.append('xhtml:p');
