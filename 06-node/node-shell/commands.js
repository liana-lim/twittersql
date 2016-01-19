var fs = require('fs');
var request = require('request');

function outwardsAndOnwards (output) {
	process.stdout.write(output);
	process.stdout.write('\nprompt > ');
}

var commands = {};

commands.date = function () {
	outwardsAndOnwards(new Date().toString());
};

commands.pwd = function () {
	outwardsAndOnwards(process.cwd());
};

commands.ls = function () {
	fs.readdir('.', function (err, subpaths) {
		if (err) throw err;
		outwardsAndOnwards(subpaths.join('\n'));
	});
};

commands.echo = function (args) {
	outwardsAndOnwards(args.join(' '));
};

commands.cat = function (args) {
	var index = 0;
	var result = '';
	function next () {
		if (index >= args.length) {
			outwardsAndOnwards(result);
		} else {
			fs.readFile(args[index], function (err, contents) {
				if (err) throw err;
				result += '\n' + contents;
				index++;
				next();
			});
		}
	}
	next();
};

commands.head = function (args) {
	fs.readFile(args[0], function (err, contents) {
		if (err) throw err;
		var firstFive = contents.toString().split('\n').slice(0,5).join('\n');
		outwardsAndOnwards(firstFive);
	});
};

commands.tail = function (args) {
	fs.readFile(args[0], function (err, contents) {
		if (err) throw err;
		var lastFive = contents.toString().split('\n').slice(-5).join('\n');
		outwardsAndOnwards(lastFive);
	});
};

function alphabeticalComparator (lineA, lineB) {
	// return -number lineA comes before lineB
	// return +number lineB comes before lineA
	// return 0 we don't care
	return lineA.charCodeAt(0) - lineB.charCodeAt(0);
}

commands.sort = function (args) {
	fs.readFile(args[0], function (err, contents) {
		if (err) throw err;
		var lines = contents.toString().split('\n');
		lines.sort();
		outwardsAndOnwards(lines.join('\n'));
	});
};

commands.wc = function (args) {
	fs.readFile(args[0], function (err, contents) {
		if (err) throw err;
		var wordCount = contents.toString().length + '';
		outwardsAndOnwards(wordCount);
	});
};

commands.uniq = function (args) {
	fs.readFile(args[0], function (err, contents) {
		if (err) throw err;
		var lines = contents.toString().split('\n');
		var nonRepeating = lines.filter(function (line, index) {
			return line !== lines[index-1];
		});
		outwardsAndOnwards(nonRepeating.join('\n'));
	});
};

commands.curl = function (args) {
	request(args[0], function (err, response, body) {
		if (err) throw err;
		if (/[123]\d{2}/.test(response.statusCode)) {
			outwardsAndOnwards(body);
		}
	});
};

module.exports = commands;