var honcho = require('honcho');
/*
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

config = {
    defaultController: 'TESTPLC',
    tagFileDir: '.',
    controllers: [{
        host: '192.168.0.1',
        connection_name: 'TESTPLC',
        port: 102,
        slot: 1,    /* See NodeS7 docs - slot 1 for 1200/1500, slot 2 for 300 */
        type: 'nodes7',
            tagfile: './testplctags.txt'
    }],

    /* Define one or more tagsets to be subscribed to */
    tagsets: ['status'],

    /* Define one or more tags to be subscribed to */
    tags : {
        'MYTAG':{
            tagsets:['status']
        }       
    }
};

function readDone(err, vars) {
    console.log(vars);
    // Or stream to a Websocket, etc
}

honcho.configure(config, function(){
    honcho.createSubscription(['MYTAG'], readDone, 500);
});
