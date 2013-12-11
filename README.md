# roomz

## Conference Room Visualizer
Displays conference rooms on the paypal campus (only SJ North campus right now). Data is pulled from Mongo DB (future -- right now in mock data). This DB can be populated from the /edit page described below or it could be populated through scripts reading the WPR floor plans directly (DWG files).

## Conference Room Booking
Allows you to book a room (upcoming feature). Right now this is a work in progress and uses some mock data that defines building 17 on the SJ campus. I am planning to connect up with a service (under LDAP) that will pull all conference rooms with data about each. 

## Conference Room Editing
Given the WPR CAD files (WDG), I convert them to SVG. The /edit loads the bld, room, floor SVG file and parses it for conference room names, bldg, floor, location information. It also does a best guess at the x,y locations on the map of these rooms and displays them below the loaded SVG map. The user (future feature) can then do some quick adjustments to location, size and add color coding. This can then be saved to Mongo DB where I am storing (future) the massaged conference room data.

# Installation 
To install the roomz app

1. Clone this repo: `git clone https://github.com/billwscott/d3-roomz.git`
2. Install npm modules: `npm install`
3. Install bower if not already installed: `npm install -g bower`
4. Install client side JavaScript libraries: `bower install`
5. Start the node app: `npm start`

`/` is floor viewer & room booking
`/edit` is the floor plan editor
