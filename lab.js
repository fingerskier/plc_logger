var IP = process.argv[2];
var tag_file = process.argv[3];

var honcho = require('honcho');

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
	tags : {
		'PT7919': {
			tagsets:['status']
		},
		'PT7913': {
			tagsets:['status']
		},
		'PV7913': {
			tagsets:['status']
		}	   
	}
};

function readDone(err, vars) {
	if (err) {
		console.error(err);
	}

	console.log(vars);
}

honcho.configure(config, function(){
	honcho.createSubscription(['MYTAG'], readDone, 500);
});
