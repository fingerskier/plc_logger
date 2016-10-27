var fs = require('fs')

var project_name = process.argv[2] || 'plc_logger';

var configuration = require("./" + project_name + ".json");

console.log(configuration)

var honcho = require('honcho');

var frequency = configuration.Frequency || 500;
var tag_file = project_name + ".pts";

honcho.configure({
	defaultController: configuration.Controller,
	tagFileDir: '.',
	controllers: [{
		host: configuration.IP_Address,
		connection_name: configuration.Connection_Name,
		port: configuration.Port,
		slot: configuration.Slot,	/* See NodeS7 docs - slot 1 for 1200/1500, slot 2 for 300 */
		type: 'nodes7',
		tagfile: tag_file
	}],

	tagsets: ['status'],	/* Define one or more tagsets to be subscribed to */

	tags: configuration.Tag_Set	/* Define one or more tags to be subscribed to */
},
function(){
	honcho.createSubscription(configuration.Subscription, readDone, frequency);
});

function readDone(err, vars) {
	if (err) {
		console.error(err);
	}

	console.log(vars);
}

/*
CLI ~ node index.js project IP_address frequency
	project = script will load project.json & project.pts
	IP_address = duh
	frequency = milliseconds between polls

    DOCS for 'honcho'
    honcho.configure(config, callback)

    Sets up the configuration and calls the callback when done. Please see above for configuration syntax.

    honcho.findItem(item, callback)

    Retuns the full "item" from the PLC driver in the callback.

    honcho.read(tags, callback)

    Reads specific tags and runs a callback with their values. Note the callback is called as callback(err, values).

    honcho.write(tag, value, callback)

    Writes a specific tag and runs an optional callback with the result.

    honcho.createSubscription(tag array, callback, interval)

    Sets up a subscription that will return the values of listed tags every timeout via the callback. Returns a token useful for removing subscriptions. Note the callback is called as callback(err, values).

    honcho.removeSubscription(token)

    Removes a subscription using a token returned when creating it.
*/
