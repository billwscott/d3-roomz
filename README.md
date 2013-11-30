# roomz

Displays conference rooms on the paypal campus and allows you to book a room (future feature). Right now this is a work in progress and uses some mock data that defines building 17 on the SJ campus. I am planning to connect up with a service (under LDAP) that will pull all conference rooms with data about each. Also, I am attempting to get the floorplans (as CAD) so that I can convert to SVG for rendering in a separate editor program that allows you to create more user friendly conference room maps.

# Installation 
To install the roomz app

1. Clone this repo: `git clone https://github.com/billwscott/d3-roomz.git`
2. Install npm modules: `npm install`
3. Install client side JavaScript libraries: `bower install`
4. Start the node app: `npm start`
