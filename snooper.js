var nodes7 = require('nodes7');
var conn = new nodes7;
var doneReading = false;
var doneWriting = false;

var configuration = require('./' + process.argv[2])

// slot 2 for 300/400, slot 1 for 1200/1500
conn.initiateConnection(configuration.connection, connected);	// TODO: replace this with a setInterval

function connected(err) {
	if (typeof(err) !== "undefined") {
		// We have an error.  Maybe the PLC is not reachable.  
		console.log(err);
		process.exit();
	}

	conn.setTranslationCB(function(tag) {return configuration.tags[tag];});  // This sets the "translation" to allow us to work with object names
	conn.addItems(Object.keys(configuration.tags));  
//  conn.removeItems(['PT-7913', 'PV-7913']);  // We could do this.  
//  conn.writeItems(['TEST5', 'TEST6'], [ 867.5309, 9 ], valuesWritten);  // You can write an array of items as well.  

	setInterval(() => {
		conn.readAllItems(valuesReady);
	},
	configuration.frequency);
}

function valuesReady(anythingBad, values) {
	if (anythingBad) { console.log("SOMETHING WENT WRONG READING VALUES!!!!"); }
	console.log(values);
	doneReading = true;
	if (doneWriting) { process.exit(); }
}

function valuesWritten(anythingBad) {
	if (anythingBad) { console.log("SOMETHING WENT WRONG WRITING VALUES!!!!"); }
	console.log("Done writing.");
	doneWriting = true;
	if (doneReading) { process.exit(); }
}
