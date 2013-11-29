function FloorPlanModel () {
	// TODO: set up caching
}

FloorPlanModel.prototype = {

	loadAsync: function (bldg, floor, callback) {

		var result = this.load(bldg, floor);
		//setTimeout(f, 1000);
		callback(result);
	},

	// Hard coded mock data for now
	load: function(bldg, floor) {
		console.log('load: floor = ' + floor);
		var self = this;


		// may want to have this sectioned as array of sites containing array of buildings 
		// containing array of floors containing array of conf rooms
		var rooms = [

			// floor 1
			[

			// top
			{x:63, y:12, width:18, height:14, name:'Leeds', color: '#FC7F08', bldg:'17', floor:'1', location:'010'},
			{x:69, y:28, width:12, height:17, name:'Rest Room', color: '#D4D4D4', bldg:'17', floor:'1', location:'000'},
			{x:83, y:28, width:12, height:17, name:'Elevator', color: '#D4D4D4', bldg:'17', floor:'1', location:'000'},

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

module.exports = FloorPlanModel;
