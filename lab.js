var filename = process.argv[2];
var IP = process.argv[3];
var frequency = process.argv[4] || 500;
var honcho = require('honcho');
var tag_file = filename + ".txt";
var tag_set = require("./" + filename + ".json");


config = {
	defaultController: 'DAQ_PLC',
	tagFileDir: '.',
	controllers: [{
		host: IP,
		connection_name: 'DAQ_PLC',
		port: 102,
		slot: 2,	/* See NodeS7 docs - slot 1 for 1200/1500, slot 2 for 300 */
		type: 'nodes7',
		tagfile: tag_file
	}],

	/* Define one or more tagsets to be subscribed to */
	tagsets: ['status'],

	/* Define one or more tags to be subscribed to */
	tags: tag_set   
};

function readDone(err, vars) {
	if (err) {
		console.error(err);
	}

	console.log(vars);
}

honcho.configure(config, function(){
	honcho.createSubscription(['PT7919', 'PT7913', 'PV7913'], readDone, frequency);
});
