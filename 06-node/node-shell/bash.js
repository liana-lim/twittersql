var foobar = require('./commands');

process.stdout.write('prompt > ');

function lookupFromEnv (word) {
	return word[0] == '$' ? process.env[word.slice(1)] : word;
}

process.stdin.on('data', function (input) {
	var commandLine = input.toString().trim();
	var words = commandLine.split(' ');
	var evaluated = words.map(lookupFromEnv);
	var command = evaluated[0];
	var args = evaluated.slice(1);
	var method = foobar[command];
	if (method) {
		method(args);
	} else {
		outwardsAndOnwards('Unrecognized command: ' + command)
	}
});